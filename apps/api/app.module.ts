import { EventStoreDBClient } from '@eventstore/db-client'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ConsoleModule } from 'nestjs-console'

import { LoggerMiddleware } from '~/middleware/logger'

import ExerciseModule from './exercise/infrastructure/module'

@Module({
  imports: [
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
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: process.env.MONGODB_URI }),
    }),
    ExerciseModule,
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
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
