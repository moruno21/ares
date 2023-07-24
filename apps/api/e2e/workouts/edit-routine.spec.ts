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
import RoutineCreated from '~/routine/domain/events/routine-created'
import InvalidRoutineDescription from '~/routine/domain/exceptions/invalid-description'
import InvalidRoutineName from '~/routine/domain/exceptions/invalid-name'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import MongooseRoutineView from '~/routine/infrastructure/models/mongoose/view'
import EventStorePublisher from '~/shared/eventstore/publisher'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'

describe('Edit Routine', () => {
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

  it('edits a routine', async () => {
    const id = Uuid.generate()
    const name = 'name'
    const description = 'description'
    const workoutExerciseId = '2699bae0-10ee-4cfa-a65b-2f17ae55bca8'
    const workouts = [{ exerciseId: workoutExerciseId, reps: 8, sets: 5 }]

    const eventStorePublisher = app.get(EventStorePublisher)
    eventStorePublisher.publish(
      ExerciseCreated.with({ description, id: workoutExerciseId, name }),
    )
    eventStorePublisher.publish(
      RoutineCreated.with({ description, id, name, workouts }),
    )

    const mongooseExerciseViews = app.get<Model<MongooseExerciseView>>(
      getModelToken(MongooseExerciseView.name),
    )
    await mongooseExerciseViews.insertMany([
      {
        _id: workoutExerciseId,
        description,
        name,
      },
    ])

    const mongooseRoutineViews = app.get<Model<MongooseRoutineView>>(
      getModelToken(MongooseRoutineView.name),
    )
    await mongooseRoutineViews.insertMany([
      {
        _id: id,
        description,
        name,
        workouts,
      },
    ])

    const newName = 'newName'
    const newDescription = 'newDescription'

    const response = await request(server)
      .put(`/routines/${id}`)
      .send({ description: newDescription, name: newName, workouts })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('description')
    expect(response.body.name).toBe(newName)
    expect(response.body.description).toBe(newDescription)
    expect(response.body.workouts).toStrictEqual(workouts)
  })

  it.each([
    {
      newDescription: 'description',
      newName: ' ',
    },
    {
      newDescription: 'description',
      newName: 'InvalidName because it is longer than fifty characters',
    },
  ])(
    'cannot edit a routine with invalid name',
    async ({ newDescription, newName }) => {
      const id = Uuid.generate()
      const name = 'name'
      const description = 'description'
      const workoutExerciseId = '2699bae0-10ee-4cfa-a65b-2f17ae55bca8'
      const workouts = [{ exerciseId: workoutExerciseId, reps: 8, sets: 5 }]

      const eventStorePublisher = app.get(EventStorePublisher)
      eventStorePublisher.publish(
        ExerciseCreated.with({ description, id: workoutExerciseId, name }),
      )
      eventStorePublisher.publish(
        RoutineCreated.with({ description, id, name, workouts }),
      )

      const mongooseExerciseViews = app.get<Model<MongooseExerciseView>>(
        getModelToken(MongooseExerciseView.name),
      )
      await mongooseExerciseViews.insertMany([
        {
          _id: workoutExerciseId,
          description,
          name,
        },
      ])

      const mongooseRoutineViews = app.get<Model<MongooseRoutineView>>(
        getModelToken(MongooseRoutineView.name),
      )
      await mongooseRoutineViews.insertMany([
        {
          _id: id,
          description,
          name,
          workouts,
        },
      ])

      const response = await request(server)
        .put(`/routines/${id}`)
        .send({ description: newDescription, name: newName, workouts })

      expect(response.status).toBe(400)
      expect(response.body.errors).toStrictEqual(
        HttpError.fromExceptions([
          newName === ' '
            ? InvalidRoutineName.causeIsBlank()
            : InvalidRoutineName.causeIsTooLong(),
        ]).errors,
      )
    },
  )

  it('cannot edit a routine with invalid description', async () => {
    const id = Uuid.generate()
    const name = 'name'
    const description = 'description'
    const workoutExerciseId = '2699bae0-10ee-4cfa-a65b-2f17ae55bca8'
    const workouts = [{ exerciseId: workoutExerciseId, reps: 8, sets: 5 }]

    const eventStorePublisher = app.get(EventStorePublisher)
    eventStorePublisher.publish(
      ExerciseCreated.with({ description, id: workoutExerciseId, name }),
    )
    eventStorePublisher.publish(
      RoutineCreated.with({ description, id, name, workouts }),
    )

    const mongooseExerciseViews = app.get<Model<MongooseExerciseView>>(
      getModelToken(MongooseExerciseView.name),
    )
    await mongooseExerciseViews.insertMany([
      {
        _id: workoutExerciseId,
        description,
        name,
      },
    ])

    const mongooseRoutineViews = app.get<Model<MongooseRoutineView>>(
      getModelToken(MongooseRoutineView.name),
    )
    await mongooseRoutineViews.insertMany([
      {
        _id: id,
        description,
        name,
        workouts,
      },
    ])

    const newName = 'newName'
    const newDescription =
      'InvalidDescription: In the vast expanse of the cosmos, countless stars twinkle in the darkness, each one a beacon of light amidst the void. Galaxies spiral and collide, giving birth to new worlds and cosmic wonders. On our tiny planet Earth, life flourishes in all its forms.'

    const response = await request(server)
      .put(`/routines/${id}`)
      .send({ description: newDescription, name: newName, workouts })

    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([InvalidRoutineDescription.causeIsTooLong()])
        .errors,
    )
  })

  it('cannot edit a routine that does not exist', async () => {
    const id = Uuid.generate()
    const name = 'name'
    const description = 'description'
    const workoutExerciseId = '2699bae0-10ee-4cfa-a65b-2f17ae55bca8'
    const workouts = [{ exerciseId: workoutExerciseId, reps: 8, sets: 5 }]

    const eventStorePublisher = app.get(EventStorePublisher)
    eventStorePublisher.publish(
      ExerciseCreated.with({ description, id: workoutExerciseId, name }),
    )
    eventStorePublisher.publish(
      RoutineCreated.with({ description, id, name, workouts }),
    )

    const mongooseExerciseViews = app.get<Model<MongooseExerciseView>>(
      getModelToken(MongooseExerciseView.name),
    )
    await mongooseExerciseViews.insertMany([
      {
        _id: workoutExerciseId,
        description,
        name,
      },
    ])

    const mongooseRoutineViews = app.get<Model<MongooseRoutineView>>(
      getModelToken(MongooseRoutineView.name),
    )
    await mongooseRoutineViews.insertMany([
      {
        _id: id,
        description,
        name,
        workouts,
      },
    ])

    const nonExistentId = Uuid.generate()
    const newName = 'newName'
    const newDescription = 'newDescription'

    const response = await request(server)
      .put(`/routines/${nonExistentId}`)
      .send({ description: newDescription, name: newName, workouts })

    expect(response.status).toBe(400)
    expect(response.body.errors).toStrictEqual(
      HttpError.fromExceptions([NotFoundRoutine.withId(nonExistentId)]).errors,
    )
  })

  afterAll(async () => {
    await app.close()
  })
})
