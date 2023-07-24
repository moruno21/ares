import { EventStoreDBClient } from '@eventstore/db-client'
import { HttpServer, INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Connection, Model } from 'mongoose'
import request from 'supertest'

import { AppModule } from '~/app.module'
import RoutineCreated from '~/routine/domain/events/routine-created'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import MongooseRoutineView from '~/routine/infrastructure/models/mongoose/view'
import { InvalidUuid } from '~/shared/domain'
import EventStorePublisher from '~/shared/eventstore/publisher'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'

describe('Delete Routine', () => {
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

  it('deletes a routine from an id', async () => {
    const id = Uuid.generate()
    const name = 'name'
    const description = 'description'
    const workouts = [
      { exerciseId: '4a6b98a7-7dd1-48e4-85d6-6e740e375a84', reps: 12, sets: 4 },
      { exerciseId: '7545bb0c-b347-441d-af79-ded69d4c089b', reps: 6, sets: 5 },
    ]

    const eventStorePublisher = app.get(EventStorePublisher)
    await eventStorePublisher.publish(
      RoutineCreated.with({ description, id, name, workouts }),
    )

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

    const deleteRoutineResponse = await request(server)
      .delete(`/routines/${id}`)
      .send()

    expect(deleteRoutineResponse.status).toBe(200)
    expect(deleteRoutineResponse.body).toHaveProperty('id')
    expect(deleteRoutineResponse.body).toHaveProperty('name')
    expect(deleteRoutineResponse.body).toHaveProperty('description')
    expect(deleteRoutineResponse.body.id).toBe(id)
    expect(deleteRoutineResponse.body.name).toBe(name)
    expect(deleteRoutineResponse.body.description).toBe(description)
    expect(deleteRoutineResponse.body.workouts).toStrictEqual(workouts)
  })

  it('cannot delete a routine from an invalid id', async () => {
    const id = 'invalidUuid'

    const response = await request(server).delete(`/routines/${id}`).send()

    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([InvalidUuid.causeTheFormatIsNotValid(id)])
        .errors,
    )
  })

  it('cannot delete a routine that does not exist', async () => {
    const nonExistentId = '0f9dcdf4-0cef-4d00-af7c-fb0b22d3805b'

    const response = await request(server)
      .delete(`/routines/${nonExistentId}`)
      .send()

    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([NotFoundRoutine.withId(nonExistentId)]).errors,
    )
  })

  afterAll(async () => {
    await app.close()
  })
})
