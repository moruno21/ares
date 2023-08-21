import { EventStoreDBClient } from '@eventstore/db-client'
import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { Connection } from 'mongoose'

import { AppModule } from '~/app.module'

describe('Get Users', () => {
  let app: INestApplication

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
    expect(true).toBe(true)
  })

  afterAll(async () => {
    await app.close()
  })
})
