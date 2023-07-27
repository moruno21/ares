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

import MongooseExerciseView from '~/exercise/infrastructure/models/mongoose/view'
import CreateRoutineHandler from '~/routine/application/commands/handlers/create-routine'
import DeleteRoutineHandler from '~/routine/application/commands/handlers/delete-routine'
import RoutineCreatedHandler from '~/routine/application/event-handlers/routine-created'
import RoutineDeletedHandler from '~/routine/application/event-handlers/routine-deleted'
import GetRoutineHandler from '~/routine/application/queries/handlers/get-routine'
import GetRoutinesHandler from '~/routine/application/queries/handlers/get-routines'
import RoutineCreated from '~/routine/domain/events/routine-created'
import RoutineDeleted from '~/routine/domain/events/routine-deleted'
import EventStoreModule from '~/shared/eventstore/module'
import EventStorePublisher from '~/shared/eventstore/publisher'

import EditRoutineHandler from '../application/commands/handlers/edit-routine'
import RoutineRedescribedHandler from '../application/event-handlers/routine-redescribed'
import RoutineRenamedHandler from '../application/event-handlers/routine-renamed'
import RoutineWorkoutDeletedHandler from '../application/event-handlers/routine-workout-deleted'
import RoutineWorkoutsChangedHandler from '../application/event-handlers/routine-workouts-changed'
import RoutineRedescribed from '../domain/events/routine-redescribed'
import RoutineRenamed from '../domain/events/routine-renamed'
import RoutineWorkoutDeleted from '../domain/events/routine-workout-deleted'
import RoutineWorkoutsChanged from '../domain/events/routine-workouts-changed'
import RoutinesController from './controllers/routines'
import MongooseRoutineView from './models/mongoose/view'
import routineProviders from './providers'
import RoutinesResolver from './resolvers/routines'

const controllers = [RoutinesController]

const commandHandlers = [
  CreateRoutineHandler,
  DeleteRoutineHandler,
  EditRoutineHandler,
]
const eventHandlers = [
  RoutineCreatedHandler,
  RoutineDeletedHandler,
  RoutineRenamedHandler,
  RoutineRedescribedHandler,
  RoutineWorkoutDeletedHandler,
  RoutineWorkoutsChangedHandler,
]
const queryHandlers = [GetRoutinesHandler, GetRoutineHandler]
const resolvers = [RoutinesResolver]

const eventFactories = {
  RoutineCreated: ({
    description,
    id,
    name,
    workouts,
  }: {
    description: string
    id: string
    name: string
    workouts: { exerciseId: string; reps: number; sets: number }[]
  }) => RoutineCreated.with({ description, id, name, workouts }),
  RoutineDeleted: ({ id }: { id: string }) => RoutineDeleted.with({ id }),
  RoutineRedescribed: ({
    description,
    id,
  }: {
    description: string
    id: string
  }) => RoutineRedescribed.with({ description, id }),
  RoutineRenamed: ({ id, name }: { id: string; name: string }) =>
    RoutineRenamed.with({ id, name }),
  RoutineWorkoutDeleted: ({
    id,
    workout,
  }: {
    id: string
    workout: { exerciseId: string; reps: number; sets: number }
  }) => RoutineWorkoutDeleted.with({ id, workout }),
  RoutineWorkoutsChanged: ({
    id,
    workouts,
  }: {
    id: string
    workouts: { exerciseId: string; reps: number; sets: number }[]
  }) => RoutineWorkoutsChanged.with({ id, workouts }),
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
    ...queryHandlers,
    ...resolvers,
    ...routineProviders,
  ],
})
class RoutineModule {
  constructor(private readonly eventStorePublisher: EventStorePublisher) {}

  onModuleInit() {
    this.eventStorePublisher.addEventFactories(eventFactories)
  }
}

export default RoutineModule
