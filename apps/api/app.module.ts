import { EventStoreDBClient } from '@eventstore/db-client'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CqrsModule, EventBus } from '@nestjs/cqrs'
import { MongooseModule } from '@nestjs/mongoose'
import { ConsoleModule } from 'nestjs-console'

import LoggerMiddleware from '~/middleware/logger'

import ExerciseModule from './exercise/infrastructure/module'
import EventPublishersHandler from './middleware/event-publishers-handler'
import EventStoreModule from './shared/eventstore/module'
import EventStorePublisher from './shared/eventstore/publisher'
import WorkoutModule from './workout/infrastructure/module'

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env.local',
        '.env',
      ],
      isGlobal: true,
    }),
    ConsoleModule,
    EventStoreModule.forRoot(),
    ExerciseModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: process.env.MONGODB_URI }),
    }),
    WorkoutModule,
  ],
  providers: [
    {
      provide: EventStoreDBClient,
      useFactory: () =>
        EventStoreDBClient.connectionString(process.env.EVENTSTOREDB_URI),
    },
  ],
})
export class AppModule implements NestModule {
  constructor(
    private readonly eventBus: EventBus,
    private readonly eventStorePublisher: EventStorePublisher,
  ) {}

  onModuleInit() {
    const eventPublishers = new EventPublishersHandler(
      this.eventStorePublisher,
      this.eventBus.publisher,
    )
    this.eventBus.publisher = eventPublishers
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
