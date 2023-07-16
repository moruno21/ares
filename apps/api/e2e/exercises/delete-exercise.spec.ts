import { EventStoreDBClient } from '@eventstore/db-client'
import { HttpServer, INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Connection, Model } from 'mongoose'
import request from 'supertest'

import { AppModule } from '~/app.module'
import ExerciseCreated from '~/exercise/domain/events/exercise-created'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import MongooseExerciseView from '~/exercise/infrastructure/models/mongoose/view'
import { InvalidUuid } from '~/shared/domain'
import EventStorePublisher from '~/shared/eventstore/publisher'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'

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
    const id = Uuid.generate()
    const name = 'name'
    const description = 'description'

    const eventStorePublisher = app.get(EventStorePublisher)
    eventStorePublisher.publish(ExerciseCreated.with({ description, id, name }))

    const mongooseViews = app.get<Model<MongooseExerciseView>>(
      getModelToken(MongooseExerciseView.name),
    )

    await mongooseViews.insertMany([
      {
        _id: id,
        description,
        name,
      },
    ])

    const deleteExerciseresponse = await request(server)
      .delete(`/exercises/${id}`)
      .send()

    expect(deleteExerciseresponse.status).toBe(200)
    expect(deleteExerciseresponse.body).toHaveProperty('id')
    expect(deleteExerciseresponse.body).toHaveProperty('name')
    expect(deleteExerciseresponse.body).toHaveProperty('description')
    expect(deleteExerciseresponse.body.id).toBe(id)
    expect(deleteExerciseresponse.body.name).toBe(name)
    expect(deleteExerciseresponse.body.description).toBe(description)
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
