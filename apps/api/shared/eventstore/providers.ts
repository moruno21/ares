import { EventStoreDBClient } from '@eventstore/db-client'

import EventStorePublisher from './publisher'

const eventStoreProviders = [
  EventStorePublisher,
  {
    provide: EventStoreDBClient,
    useFactory: () =>
      EventStoreDBClient.connectionString(process.env.EVENTSTOREDB_URI),
  },
]

export default eventStoreProviders
