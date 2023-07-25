import { EventStoreDBClient } from '@eventstore/db-client'
import { HttpServer, INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { Connection } from 'mongoose'
import request from 'supertest'

import { AppModule } from '~/app.module'
import InvalidExerciseDescription from '~/exercise/domain/exceptions/invalid-description'
import InvalidExerciseName from '~/exercise/domain/exceptions/invalid-name'
import NotCreatedExercise from '~/exercise/domain/exceptions/not-created'
import HttpError from '~/shared/http/error'

describe('Create Exercise', () => {
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

  it('creates an exercise', async () => {
    const name = 'name'
    const description = 'description'

    const response = await request(server)
      .post('/exercises')
      .send({ description, name })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('description')
    expect(response.body.name).toBe(name)
    expect(response.body.description).toBe(description)
  })

  it.each([
    {
      description: 'description',
      name: ' ',
    },
    {
      description: 'description',
      name: 'InvalidName because it is longer than fifty characters',
    },
  ])(
    'cannot create an exercise with invalid name',
    async ({ description, name }) => {
      const response = await request(server)
        .post('/exercises')
        .send({ description, name })

      expect(response.status).toBe(400)
      expect(response.body.errors).toStrictEqual(
        HttpError.fromExceptions([
          name === ' '
            ? InvalidExerciseName.causeIsBlank()
            : InvalidExerciseName.causeIsTooLong(),
        ]).errors,
      )
    },
  )

  it('cannot create an exercise with invalid description', async () => {
    const name = 'name'
    const description =
      'InvalidDescription: In the vast expanse of the cosmos, countless stars twinkle in the darkness, each one a beacon of light amidst the void. Galaxies spiral and collide, giving birth to new worlds and cosmic wonders. On our tiny planet Earth, life flourishes in all its forms.'

    const response = await request(server)
      .post('/exercises')
      .send({ description, name })

    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([InvalidExerciseDescription.causeIsTooLong()])
        .errors,
    )
  })

  it('cannot create an exercise whose name is already used by another exercise', async () => {
    const name = 'existentName'
    const description = 'description'

    await request(server).post('/exercises').send({ description, name })

    const response = await request(server)
      .post('/exercises')
      .send({ description, name })

    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([
        NotCreatedExercise.causeAlreadyExistsOneWithName(name),
      ]).errors,
    )
  })

  afterAll(async () => {
    await app.close()
  })
})
