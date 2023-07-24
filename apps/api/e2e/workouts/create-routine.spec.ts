import { EventStoreDBClient } from '@eventstore/db-client'
import { HttpServer, INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Connection, Model } from 'mongoose'
import request from 'supertest'

import { AppModule } from '~/app.module'
import ExerciseCreated from '~/exercise/domain/events/exercise-created'
import MongooseExerciseView from '~/exercise/infrastructure/models/mongoose/view'
import InvalidRoutineDescription from '~/routine/domain/exceptions/invalid-description'
import InvalidRoutineName from '~/routine/domain/exceptions/invalid-name'
import EventStorePublisher from '~/shared/eventstore/publisher'
import HttpError from '~/shared/http/error'

describe('Create Routine', () => {
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

  it('creates a routine', async () => {
    const name = 'name'
    const description = 'description'
    const workoutExerciseId = '46d1fc9b-0135-40ba-88fb-305037eb202c'
    const workouts = [{ exerciseId: workoutExerciseId, reps: 8, sets: 5 }]

    const eventStorePublisher = app.get(EventStorePublisher)
    eventStorePublisher.publish(
      ExerciseCreated.with({ description, id: workoutExerciseId, name }),
    )

    const mongooseViews = app.get<Model<MongooseExerciseView>>(
      getModelToken(MongooseExerciseView.name),
    )
    await mongooseViews.insertMany([
      {
        _id: workoutExerciseId,
        description,
        name,
      },
    ])

    const response = await request(server)
      .post('/routines')
      .send({ description, name, workouts })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('description')
    expect(response.body.name).toBe(name)
    expect(response.body.description).toBe(description)
    expect(response.body.workouts).toStrictEqual(workouts)
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
    'cannot create a routine with invalid name',
    async ({ description, name }) => {
      const workoutExerciseId = 'b77a4c59-d7e7-4a09-98c7-f0e8a17258b0'
      const workouts = [{ exerciseId: workoutExerciseId, reps: 8, sets: 5 }]

      const eventStorePublisher = app.get(EventStorePublisher)
      eventStorePublisher.publish(
        ExerciseCreated.with({ description, id: workoutExerciseId, name }),
      )
      const mongooseViews = app.get<Model<MongooseExerciseView>>(
        getModelToken(MongooseExerciseView.name),
      )
      await mongooseViews.insertMany([
        {
          _id: workoutExerciseId,
          description,
          name,
        },
      ])

      const response = await request(server)
        .post('/routines')
        .send({ description, name, workouts })

      expect(response.status).toBe(400)
      expect(response.body.errors).toStrictEqual(
        HttpError.fromExceptions([
          name === ' '
            ? InvalidRoutineName.causeIsBlank()
            : InvalidRoutineName.causeIsTooLong(),
        ]).errors,
      )
    },
  )

  it('cannot create a routine with invalid description', async () => {
    const name = 'name'
    const description =
      'InvalidDescription: In the vast expanse of the cosmos, countless stars twinkle in the darkness, each one a beacon of light amidst the void. Galaxies spiral and collide, giving birth to new worlds and cosmic wonders. On our tiny planet Earth, life flourishes in all its forms.'
    const workoutExerciseId = 'fbe8195d-7f45-44d3-9012-7487fae9a9a4'
    const workouts = [{ exerciseId: workoutExerciseId, reps: 8, sets: 5 }]

    const eventStorePublisher = app.get(EventStorePublisher)
    eventStorePublisher.publish(
      ExerciseCreated.with({ description, id: workoutExerciseId, name }),
    )

    const mongooseViews = app.get<Model<MongooseExerciseView>>(
      getModelToken(MongooseExerciseView.name),
    )
    await mongooseViews.insertMany([
      {
        _id: workoutExerciseId,
        description,
        name,
      },
    ])

    const response = await request(server)
      .post('/routines')
      .send({ description, name, workouts })

    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([InvalidRoutineDescription.causeIsTooLong()])
        .errors,
    )
  })

  afterAll(async () => {
    await app.close()
  })
})
