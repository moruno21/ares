import { EventStoreDBClient } from '@eventstore/db-client'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'

import CreateExerciseHandler from '~/exercise/application/commands/handlers/create-exercise'
import ExerciseCreatedHandler from '~/exercise/application/event-handlers/exercise-created'

import PostExercise from './controllers/http/post'
import MongooseExerciseView from './models/mongoose/view'
import exerciseProviders from './providers'

const controllers = [PostExercise]
const commandHandlers = [CreateExerciseHandler]
const eventHandlers = [ExerciseCreatedHandler]

@Module({
  controllers,
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: MongooseExerciseView.name,
        schema: SchemaFactory.createForClass(MongooseExerciseView),
      },
    ]),
  ],
  providers: [
    ...commandHandlers,
    ...eventHandlers,
    ...exerciseProviders,
    {
      provide: EventStoreDBClient,
      useFactory: () =>
        EventStoreDBClient.connectionString(process.env.EVENTSTOREDB_URI),
    },
  ],
})
class ExerciseModule {}

export default ExerciseModule
