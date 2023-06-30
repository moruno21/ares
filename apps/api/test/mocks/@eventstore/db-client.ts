import { EventStoreDBClient } from '@eventstore/db-client'

const EventStoreDBClientMock = {
  mock: () =>
    ({
      appendToStream: jest.fn(),
    } as unknown as EventStoreDBClient),
} as const

export default EventStoreDBClientMock
