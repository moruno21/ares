import { DynamicModule, Module } from '@nestjs/common'

import eventStoreProviders from './providers'
import EventStorePublisher from './publisher'

@Module({})
class EventStoreModule {
  static forRoot(): DynamicModule {
    return {
      exports: [EventStorePublisher],
      module: EventStoreModule,
      providers: eventStoreProviders,
    }
  }
}

export default EventStoreModule
