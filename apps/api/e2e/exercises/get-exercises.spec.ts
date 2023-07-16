import { EventStoreDBClient } from '@eventstore/db-client'
import { HttpServer, INestApplication } from '@nestjs/common'
import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Connection, Model } from 'mongoose'
import request from 'supertest'

import { AppModule } from '~/app.module'
import MongooseExerciseView from '~/exercise/infrastructure/models/mongoose/view'
import Uuid from '~/shared/uuid'

describe('Get Exercises', () => {
  let app: INestApplication
  let server: HttpServer

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
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

  it('gets all the exercises', async () => {
    const mongooseViews = app.get<Model<MongooseExerciseView>>(
      getModelToken(MongooseExerciseView.name),
    )
    const name = 'name'
    const description = 'description'

    await mongooseViews.insertMany([
      {
        _id: Uuid.generate(),
        description,
        name,
      },
    ])

    const response = await request(server).get('/exercises').send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('name')
    expect(response.body[0]).toHaveProperty('description')
    expect(response.body[0].name).toBe(name)
    expect(response.body[0].description).toBe(description)
  })

  it('returns an empty value when there are no exercises', async () => {
    const response = await request(server).get('/exercises').send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(0)
  })

  afterAll(async () => {
    await app.close()
  })
})
