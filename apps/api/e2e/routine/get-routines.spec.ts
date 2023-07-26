import { EventStoreDBClient } from '@eventstore/db-client'
import { HttpServer, INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Connection, Model } from 'mongoose'
import request from 'supertest'

import { AppModule } from '~/app.module'
import MongooseRoutineView from '~/routine/infrastructure/models/mongoose/view'
import Uuid from '~/shared/uuid'

describe('Get Routines', () => {
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

  it('gets all the routines', async () => {
    const name = 'name'
    const description = 'description'
    const workouts = [
      { exerciseId: '2a00738b-95e3-4c4c-bf1c-f3bd151a8575', reps: 5, sets: 4 },
      { exerciseId: '8ad2eeae-5d0b-4bfb-a863-24ec53461017', reps: 8, sets: 4 },
    ]

    const mongooseViews = app.get<Model<MongooseRoutineView>>(
      getModelToken(MongooseRoutineView.name),
    )
    await mongooseViews.insertMany([
      {
        _id: Uuid.generate(),
        description,
        name,
        workouts,
      },
    ])

    const response = await request(server).get('/routines').send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('name')
    expect(response.body[0]).toHaveProperty('description')
    expect(response.body[0]).toHaveProperty('workouts')
    expect(response.body[0].name).toBe(name)
    expect(response.body[0].description).toBe(description)
    expect(response.body[0].workouts).toStrictEqual(workouts)
  })

  it('returns an empty value when there are no routines', async () => {
    const response = await request(server).get('/routines').send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(0)
  })

  afterAll(async () => {
    await app.close()
  })
})
