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

import CreateRoutineHandler from '~/routine/application/commands/handlers/create-routine'
import RoutineCreatedHandler from '~/routine/application/event-handlers/routine-created'
import RoutineCreated from '~/routine/domain/events/routine-created'
import EventStoreModule from '~/shared/eventstore/module'
import EventStorePublisher from '~/shared/eventstore/publisher'

import RoutinesController from './controllers/routines'
import MongooseRoutineView from './models/mongoose/view'
import routineProviders from './providers'
import RoutinesResolver from './resolvers/routines'

const resolvers = [RoutinesResolver]
const controllers = [RoutinesController]
const commandHandlers = [CreateRoutineHandler]
const eventHandlers = [RoutineCreatedHandler]

const eventFactories = {
  RoutineCreated: ({
    description,
    id,
    name,
  }: {
    description: string
    id: string
    name: string
  }) => RoutineCreated.with({ description, id, name }),
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
        name: MongooseRoutineView.name,
        schema: SchemaFactory.createForClass(MongooseRoutineView),
      },
    ]),
  ],
  providers: [
    ...commandHandlers,
    ...eventHandlers,
    ...routineProviders,
    ...resolvers,
  ],
})
class RoutineModule {
  constructor(private readonly eventStorePublisher: EventStorePublisher) {}

  onModuleInit() {
    this.eventStorePublisher.addEventFactories(eventFactories)
  }
}

export default RoutineModule
