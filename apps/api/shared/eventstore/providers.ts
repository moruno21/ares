import { EventStoreDBClient } from '@eventstore/db-client'

import EventStorePublisher from './publisher'

const eventStoreProviders = [
  {
    provide: EventStoreDBClient,
    useFactory: () =>
      EventStoreDBClient.connectionString(process.env.EVENTSTOREDB_URI),
  },
  EventStorePublisher,
]

export default eventStoreProviders
