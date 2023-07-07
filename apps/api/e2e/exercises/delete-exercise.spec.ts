import { EventStoreDBClient } from '@eventstore/db-client'
import { HttpServer, INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Connection } from 'mongoose'
import request from 'supertest'

import CreateExerciseHandler from '~/exercise/application/commands/handlers/create-exercise'
import DeleteExerciseHandler from '~/exercise/application/commands/handlers/delete-exercise'
import ExerciseCreatedHandler from '~/exercise/application/event-handlers/exercise-created'
import ExerciseDeletedHandler from '~/exercise/application/event-handlers/exercise-deleted'
import ExerciseViews from '~/exercise/application/services/views'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import Exercises from '~/exercise/domain/services/exercises'
import ExercisesController from '~/exercise/infrastructure/controllers/exercises'
import MongooseExerciseView from '~/exercise/infrastructure/models/mongoose/view'
import EventStoreExercises from '~/exercise/infrastructure/services/eventstore-exercises'
import MongooseExerciseViews from '~/exercise/infrastructure/services/mongoose-views'
import { InvalidUuid } from '~/shared/domain'
import HttpError from '~/shared/http/error'

describe('Delete Exercise', () => {
  let app: INestApplication
  let server: HttpServer

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [ExercisesController],
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['env.test.local', '.env.test'],
        }),
        MongooseModule.forRootAsync({
          useFactory: () => ({ uri: process.env.MONGODB_URI }),
        }),
        MongooseModule.forFeature([
          {
            name: MongooseExerciseView.name,
            schema: SchemaFactory.createForClass(MongooseExerciseView),
          },
        ]),
        CqrsModule,
      ],
      providers: [
        {
          provide: EventStoreDBClient,
          useFactory: () =>
            EventStoreDBClient.connectionString(process.env.EVENTSTOREDB_URI),
        },
        DeleteExerciseHandler,
        CreateExerciseHandler,
        ExerciseCreatedHandler,
        ExerciseDeletedHandler,
        {
          provide: Exercises,
          useClass: EventStoreExercises,
        },
        {
          provide: ExerciseViews,
          useClass: MongooseExerciseViews,
        },
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
      .post('/exercises')
      .send({ description, name })

    const deleteExerciseresponse = await request(server)
      .delete(`/exercises/${createExerciseResponse.body.id}`)
      .send()

    expect(deleteExerciseresponse.status).toBe(200)
    expect(deleteExerciseresponse.body).toHaveProperty('id')
    expect(deleteExerciseresponse.body).toHaveProperty('name')
    expect(deleteExerciseresponse.body).toHaveProperty('description')
    expect(deleteExerciseresponse.body.id).toBe(createExerciseResponse.body.id)
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
