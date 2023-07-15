import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'

import CreateExerciseHandler from '~/exercise/application/commands/handlers/create-exercise'
import DeleteExerciseHandler from '~/exercise/application/commands/handlers/delete-exercise'
import ExerciseCreatedHandler from '~/exercise/application/event-handlers/exercise-created'
import ExerciseDeletedHandler from '~/exercise/application/event-handlers/exercise-deleted'
import GetExerciseHandler from '~/exercise/application/queries/handlers/get-exercise'
import GetExercisesHandler from '~/exercise/application/queries/handlers/get-exercises'
import ExerciseCreated from '~/exercise/domain/events/exercise-created'
import ExerciseDeleted from '~/exercise/domain/events/exercise-deleted'
import EventStoreModule from '~/shared/eventstore/module'
import EventStorePublisher from '~/shared/eventstore/publisher'

import Exercise from '../domain/models/exercise'
import ExercisesController from './controllers/exercises'
import MongooseExerciseView from './models/mongoose/view'
import exerciseProviders from './providers'
import ExercisesResolver from './resolvers/exercises'

const resolvers = [ExercisesResolver]
const controllers = [ExercisesController]
const commandHandlers = [CreateExerciseHandler, DeleteExerciseHandler]
const queryHandlers = [GetExerciseHandler, GetExercisesHandler]
const eventHandlers = [ExerciseCreatedHandler, ExerciseDeletedHandler]

const eventFactories = {
  ExerciseCreated: ({
    description,
    id,
    name,
  }: {
    description: string
    id: string
    name: string
  }) => ExerciseCreated.with({ description, id, name }),
  ExerciseDeleted: ({ id }: { id: string }) => ExerciseDeleted.with({ id }),
}

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
    EventStoreModule.forRoot(),
  ],
  providers: [
    ...queryHandlers,
    ...commandHandlers,
    ...eventHandlers,
    ...exerciseProviders,
    ...resolvers,
  ],
})
class ExerciseModule {
  constructor(private readonly eventStorePublisher: EventStorePublisher) {}

  onModuleInit() {
    this.eventStorePublisher.addEventFactories(eventFactories)
    this.eventStorePublisher.setCategory(Exercise.name)
  }
}

export default ExerciseModule
