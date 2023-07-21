import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { Module, OnModuleInit } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'

import EventStoreModule from '~/shared/eventstore/module'
import EventStorePublisher from '~/shared/eventstore/publisher'
import CreateWorkoutHandler from '~/workout/application/commands/handlers/create-workout'
import WorkoutCreatedHandler from '~/workout/application/event-handlers/workout-created'
import WorkoutCreated from '~/workout/domain/events/workout-created'

import WorkoutsController from './controllers/workouts'
import MongooseWorkoutView from './models/mongoose/view'
import workoutProviders from './providers'
import WorkoutsResolver from './resolvers/workouts'

const resolvers = [WorkoutsResolver]
const controllers = [WorkoutsController]
const commandHandlers = [CreateWorkoutHandler]
const eventHandlers = [WorkoutCreatedHandler]

const eventFactories = {
  WorkoutCreated: ({
    exerciseId,
    id,
    reps,
    sets,
  }: {
    exerciseId: string
    id: string
    reps: number
    sets: number
  }) => WorkoutCreated.with({ exerciseId, id, reps, sets }),
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
        name: MongooseWorkoutView.name,
        schema: SchemaFactory.createForClass(MongooseWorkoutView),
      },
    ]),
  ],
  providers: [
    ...commandHandlers,
    ...eventHandlers,
    ...workoutProviders,
    ...resolvers,
  ],
})
class WorkoutModule implements OnModuleInit {
  constructor(private readonly eventStorePublisher: EventStorePublisher) {}

  onModuleInit() {
    this.eventStorePublisher.addEventFactories(eventFactories)
  }
}

export default WorkoutModule
