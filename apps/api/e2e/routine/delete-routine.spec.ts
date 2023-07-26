import { EventStoreDBClient } from '@eventstore/db-client'
import { HttpServer, INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { Connection } from 'mongoose'
import request from 'supertest'

import { AppModule } from '~/app.module'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import { InvalidUuid } from '~/shared/domain'
import HttpError from '~/shared/http/error'

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
    const name = 'name'
    const description = 'description'
    const workouts = []

    const createRoutineResponse = await request(server)
      .post('/routines')
      .send({ description, name, workouts })

    await request(server).get('/routines')

    const response = await request(server)
      .delete(`/routines/${createRoutineResponse.body.id}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('workouts')
    expect(response.body.id).toBe(createRoutineResponse.body.id)
    expect(response.body.name).toBe(name)
    expect(response.body.description).toBe(description)
    expect(response.body.workouts).toStrictEqual(workouts)
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
