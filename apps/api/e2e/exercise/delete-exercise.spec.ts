import { EventStoreDBClient } from '@eventstore/db-client'
import { HttpServer, INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { Connection } from 'mongoose'
import request from 'supertest'

import { AppModule } from '~/app.module'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import { InvalidUuid } from '~/shared/domain'
import HttpError from '~/shared/http/error'

describe('Delete Exercise', () => {
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

  it('deletes an exercise from an id', async () => {
    const name = 'name'
    const description = 'description'

    const createExerciseResponse = await request(server)
      .post(`/exercises`)
      .send({ description, name })

    await request(server).get('/exercises')

    const response = await request(server)
      .delete(`/exercises/${createExerciseResponse.body.id}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('description')
    expect(response.body.id).toBe(createExerciseResponse.body.id)
    expect(response.body.name).toBe(name)
    expect(response.body.description).toBe(description)
  })

  it('cannot delete an exercise from an invalid id', async () => {
    const id = 'invalidUuid'

    const response = await request(server).delete(`/exercises/${id}`).send()

    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([InvalidUuid.causeTheFormatIsNotValid(id)])
        .errors,
    )
  })

  it('cannot delete an exercise that does not exist', async () => {
    const nonExistentId = '2522e36c-545b-479a-8a34-efa6a47f833a'

    const response = await request(server)
      .delete(`/exercises/${nonExistentId}`)
      .send()

    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([NotFoundExercise.withId(nonExistentId)]).errors,
    )
  })

  afterAll(async () => {
    await app.close()
  })
})
