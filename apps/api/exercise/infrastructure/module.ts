import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled'
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
import EditExerciseHandler from '~/exercise/application/commands/handlers/edit-exercise'
import ExerciseCreatedHandler from '~/exercise/application/event-handlers/exercise-created'
import ExerciseDeletedHandler from '~/exercise/application/event-handlers/exercise-deleted'
import ExerciseRedescribedHandler from '~/exercise/application/event-handlers/exercise-redescribed'
import ExerciseRenamedHandler from '~/exercise/application/event-handlers/exercise-renamed'
import ExerciseDeletedProcessManager from '~/exercise/application/process-manager/exercise-deleted'
import GetExerciseHandler from '~/exercise/application/queries/handlers/get-exercise'
import GetExercisesHandler from '~/exercise/application/queries/handlers/get-exercises'
import ExerciseCreated from '~/exercise/domain/events/exercise-created'
import ExerciseDeleted from '~/exercise/domain/events/exercise-deleted'
import ExerciseRedescribed from '~/exercise/domain/events/exercise-redescribed'
import ExerciseRenamed from '~/exercise/domain/events/exercise-renamed'
import MongooseRoutineView from '~/routine/infrastructure/models/mongoose/view'
import EventStoreModule from '~/shared/eventstore/module'
import EventStorePublisher from '~/shared/eventstore/publisher'

import ExercisesController from './controllers/exercises'
import MongooseExerciseView from './models/mongoose/view'
import exerciseProviders from './providers'
import ExercisesResolver from './resolvers/exercises'

const controllers = [ExercisesController]

const commandHandlers = [
  CreateExerciseHandler,
  DeleteExerciseHandler,
  EditExerciseHandler,
]
const eventHandlers = [
  ExerciseCreatedHandler,
  ExerciseDeletedHandler,
  ExerciseRedescribedHandler,
  ExerciseRenamedHandler,
]
const processManagers = [ExerciseDeletedProcessManager]
const queryHandlers = [GetExerciseHandler, GetExercisesHandler]
const resolvers = [ExercisesResolver]

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
  ExerciseRedescribed: ({
    description,
    id,
  }: {
    description: string
    id: string
  }) => ExerciseRedescribed.with({ description, id }),
  ExerciseRenamed: ({ id, name }: { id: string; name: string }) =>
    ExerciseRenamed.with({ id, name }),
}

@Module({
  controllers,
  imports: [
    CqrsModule,
    EventStoreModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: { federation: 2 },
      driver: ApolloFederationDriver,
      playground: false,
      plugins: [
        ApolloServerPluginInlineTraceDisabled(),
        ApolloServerPluginLandingPageLocalDefault(),
      ],
    }),
    MongooseModule.forFeature([
      {
        name: MongooseExerciseView.name,
        schema: SchemaFactory.createForClass(MongooseExerciseView),
      },
    ]),
    MongooseModule.forFeature([
      {
        name: MongooseRoutineView.name,
        schema: SchemaFactory.createForClass(MongooseRoutineView),
      },
    ]),
  ],
  providers: [
    ...commandHandlers,
    ...eventHandlers,
    ...exerciseProviders,
    ...processManagers,
    ...queryHandlers,
    ...resolvers,
  ],
})
class ExerciseModule {
  constructor(private readonly eventStorePublisher: EventStorePublisher) {}

  onModuleInit() {
    this.eventStorePublisher.addEventFactories(eventFactories)
  }
}

export default ExerciseModule
