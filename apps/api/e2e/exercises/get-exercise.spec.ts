import { EventStoreDBClient } from '@eventstore/db-client'
import { HttpServer, INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { getModelToken, MongooseModule, SchemaFactory } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Connection, Model } from 'mongoose'
import request from 'supertest'

import GetExerciseHandler from '~/exercise/application/queries/handlers/get-exercise'
import ExerciseViews from '~/exercise/application/services/views'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import Exercises from '~/exercise/domain/services/exercises'
import ExercisesController from '~/exercise/infrastructure/controllers/exercises'
import MongooseExerciseView from '~/exercise/infrastructure/models/mongoose/view'
import EventStoreExercises from '~/exercise/infrastructure/services/eventstore-exercises'
import MongooseExerciseViews from '~/exercise/infrastructure/services/mongoose-views'
import { InvalidUuid } from '~/shared/domain'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'

describe('Get Exercise', () => {
  let app: INestApplication
  let server: HttpServer

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [ExercisesController],
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.test.local', '.env.test'],
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
        GetExerciseHandler,
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

  it('gets an exercise from an id', async () => {
    const mongooseViews = app.get<Model<MongooseExerciseView>>(
      getModelToken(MongooseExerciseView.name),
    )
    const id = Uuid.generate()
    const name = 'name'
    const description = 'description'

    await mongooseViews.insertMany([
      {
        _id: id,
        description,
        name,
      },
    ])

    const response = await request(server).get(`/exercises/${id}`).send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('description')
    expect(response.body.id).toBe(id)
    expect(response.body.name).toBe(name)
    expect(response.body.description).toBe(description)
  })

  it('cannot get an exercise from an invalid id', async () => {
    const id = 'invalidUuid'

    const response = await request(server).get(`/exercises/${id}`).send()

    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([InvalidUuid.causeTheFormatIsNotValid(id)])
        .errors,
    )
  })

  it('cannot get an exercise that does not exist', async () => {
    const mongooseViews = app.get<Model<MongooseExerciseView>>(
      getModelToken(MongooseExerciseView.name),
    )
    const id = Uuid.generate()
    const name = 'name'
    const description = 'description'

    await mongooseViews.insertMany([
      {
        _id: id,
        description,
        name,
      },
    ])

    const nonExistentUuid = Uuid.generate()

    const response = await request(server)
      .get(`/exercises/${nonExistentUuid}`)
      .send()
    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([NotFoundExercise.withId(nonExistentUuid)])
        .errors,
    )
  })

  afterAll(async () => {
    await app.close()
  })
})
