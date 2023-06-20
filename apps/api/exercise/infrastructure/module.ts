import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { EventStoreDBClient } from '@eventstore/db-client'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'

import CreateExerciseHandler from '~/exercise/application/commands/handlers/create-exercise'
import ExerciseCreatedHandler from '~/exercise/application/event-handlers/exercise-created'

import GetExerciseHandler from '../application/queries/handlers/get-exercise'
import GetExercisesHandler from '../application/queries/handlers/get-exercises'
import ExercisesController from './controllers/exercises'
import MongooseExerciseView from './models/mongoose/view'
import exerciseProviders from './providers'
import ExercisesResolver from './resolvers/exercises'

const resolvers = [ExercisesResolver]
const controllers = [ExercisesController]
const commandHandlers = [CreateExerciseHandler]
const queryHandlers = [GetExerciseHandler, GetExercisesHandler]
const eventHandlers = [ExerciseCreatedHandler]

@Module({
  controllers,
  imports: [
    CqrsModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: { federation: 2 },
      driver: ApolloFederationDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    MongooseModule.forFeature([
      {
        name: MongooseExerciseView.name,
        schema: SchemaFactory.createForClass(MongooseExerciseView),
      },
    ]),
  ],
  providers: [
    ...queryHandlers,
    ...commandHandlers,
    ...eventHandlers,
    ...exerciseProviders,
    ...resolvers,
    {
      provide: EventStoreDBClient,
      useFactory: () =>
        EventStoreDBClient.connectionString(process.env.EVENTSTOREDB_URI),
    },
  ],
})
class ExerciseModule {}

export default ExerciseModule
