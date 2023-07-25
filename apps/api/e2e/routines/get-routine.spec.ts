import { EventStoreDBClient } from '@eventstore/db-client'
import { HttpServer, INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Connection, Model } from 'mongoose'
import request from 'supertest'

import { AppModule } from '~/app.module'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import MongooseRoutineView from '~/routine/infrastructure/models/mongoose/view'
import { InvalidUuid } from '~/shared/domain'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'

describe('Get Routine', () => {
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

  it('gets a routine from an id', async () => {
    const id = Uuid.generate()
    const name = 'name'
    const description = 'description'
    const workouts = [
      { exerciseId: 'a45a38d5-4202-46dc-9224-dd1e6b21addc', reps: 10, sets: 3 },
      { exerciseId: '76188845-c86f-4b24-8821-a90d8557b661', reps: 6, sets: 6 },
    ]

    const mongooseViews = app.get<Model<MongooseRoutineView>>(
      getModelToken(MongooseRoutineView.name),
    )
    await mongooseViews.insertMany([
      {
        _id: id,
        description,
        name,
        workouts,
      },
    ])

    const response = await request(server).get(`/routines/${id}`).send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('workouts')
    expect(response.body.id).toBe(id)
    expect(response.body.name).toBe(name)
    expect(response.body.description).toBe(description)
    expect(response.body.workouts).toStrictEqual(workouts)
  })

  it('cannot get a routine from an invalid id', async () => {
    const id = 'invalidUuid'

    const response = await request(server).get(`/routines/${id}`).send()

    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([InvalidUuid.causeTheFormatIsNotValid(id)])
        .errors,
    )
  })

  it('cannot get a routine that does not exist', async () => {
    const id = Uuid.generate()
    const name = 'name'
    const description = 'description'

    const mongooseViews = app.get<Model<MongooseRoutineView>>(
      getModelToken(MongooseRoutineView.name),
    )
    await mongooseViews.insertMany([
      {
        _id: id,
        description,
        name,
      },
    ])

    const nonExistentUuid = Uuid.generate()

    const response = await request(server)
      .get(`/routines/${nonExistentUuid}`)
      .send()
    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([NotFoundRoutine.withId(nonExistentUuid)])
        .errors,
    )
  })

  afterAll(async () => {
    await app.close()
  })
})
