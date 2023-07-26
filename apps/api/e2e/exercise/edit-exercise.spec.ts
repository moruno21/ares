import { EventStoreDBClient } from '@eventstore/db-client'
import { HttpServer, INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { Connection } from 'mongoose'
import request from 'supertest'

import { AppModule } from '~/app.module'
import InvalidExerciseDescription from '~/exercise/domain/exceptions/invalid-description'
import InvalidExerciseName from '~/exercise/domain/exceptions/invalid-name'
import NotEditedExercise from '~/exercise/domain/exceptions/not-edited'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'

describe('Edit Exercise', () => {
  let app: INestApplication
  let server: HttpServer

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          envFilePath: ['env.test.local', '.env.test'],
        }),
      ],
    }).compile()

    app = module.createNestApplication()
    await app.init()
    server = app.getHttpServer()
  })

  afterEach(async () => {
    const eventStore = app.get(EventStoreDBClient)
    const events = eventStore.readAll()
    const mongoose = app.get<Connection>('DatabaseConnection')

    for await (const resolvedEvent of events) {
      if (!resolvedEvent.event || resolvedEvent.event.type.startsWith('$'))
        continue

      try {
        await eventStore.tombstoneStream(resolvedEvent.event.streamId)
      } catch {}
    }

    await mongoose.dropDatabase()
  })

  it('edits an exercise', async () => {
    const name = 'name'
    const description = 'description'

    const createExerciseResponse = await request(server)
      .post(`/exercises`)
      .send({ description, name })

    await request(server).get('/exercises')

    const newName = 'newName'
    const newDescription = 'newDescription'

    const response = await request(server)
      .put(`/exercises/${createExerciseResponse.body.id}`)
      .send({ description: newDescription, name: newName })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('description')
    expect(response.body.id).toBe(createExerciseResponse.body.id)
    expect(response.body.name).toBe(newName)
    expect(response.body.description).toBe(newDescription)
  })

  it.each([
    {
      newDescription: 'description',
      newName: ' ',
    },
    {
      newDescription: 'description',
      newName: 'InvalidName because it is longer than fifty characters',
    },
  ])(
    'cannot edit an exercise with invalid name',
    async ({ newDescription, newName }) => {
      const name = 'name'
      const description = 'description'

      const createExerciseResponse = await request(server)
        .post(`/exercises`)
        .send({ description, name })

      await request(server).get('/exercises')

      const response = await request(server)
        .put(`/exercises/${createExerciseResponse.body.id}`)
        .send({ description: newDescription, name: newName })

      expect(response.status).toBe(400)
      expect(response.body.errors).toStrictEqual(
        HttpError.fromExceptions([
          newName === ' '
            ? InvalidExerciseName.causeIsBlank()
            : InvalidExerciseName.causeIsTooLong(),
        ]).errors,
      )
    },
  )

  it('cannot edit an exercise with invalid description', async () => {
    const name = 'name'
    const description = 'description'

    const createExerciseResponse = await request(server)
      .post(`/exercises`)
      .send({ description, name })

    await request(server).get('/exercises')

    const newName = 'newName'
    const newDescription =
      'InvalidDescription: In the vast expanse of the cosmos, countless stars twinkle in the darkness, each one a beacon of light amidst the void. Galaxies spiral and collide, giving birth to new worlds and cosmic wonders. On our tiny planet Earth, life flourishes in all its forms.'

    const response = await request(server)
      .put(`/exercises/${createExerciseResponse.body.id}`)
      .send({ description: newDescription, name: newName })

    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([InvalidExerciseDescription.causeIsTooLong()])
        .errors,
    )
  })

  it('cannot edit an exercise with a name that is already used by another exercise', async () => {
    const nameOne = 'nameOne'
    const descriptionOne = 'descriptionOne'
    const nameTwo = 'nameTwo'
    const descriptionTwo = 'descriptionTwo'

    const createExerciseOneResponse = await request(server)
      .post(`/exercises`)
      .send({ description: descriptionOne, name: nameOne })

    await request(server)
      .post(`/exercises`)
      .send({ description: descriptionTwo, name: nameTwo })

    await request(server).get('/exercises')

    const response = await request(server)
      .put(`/exercises/${createExerciseOneResponse.body.id}`)
      .send({ description: descriptionTwo, name: nameTwo })

    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([
        NotEditedExercise.causeAlreadyExistsOneWithName(nameTwo),
      ]).errors,
    )
  })

  it('cannot edit an exercise that does not exist', async () => {
    const nonExistentId = Uuid.generate()
    const newName = 'newName'
    const newDescription = 'newDescription'

    const response = await request(server)
      .put(`/exercises/${nonExistentId}`)
      .send({ description: newDescription, name: newName })

    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([NotFoundExercise.withId(nonExistentId)]).errors,
    )
  })

  afterAll(async () => {
    await app.close()
  })
})
