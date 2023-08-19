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

import EventStoreModule from '~/shared/eventstore/module'
import EventStorePublisher from '~/shared/eventstore/publisher'
import CreateUserHandler from '~/user/application/commands/handlers/create-user'
import UserCreatedHandler from '~/user/application/event-handlers/user-created'
import GetUserHandler from '~/user/application/queries/handlers/get-user'
import GetUsersHandler from '~/user/application/queries/handlers/get-users'
import UserCreated from '~/user/domain/events/user-created'

import UsersController from './controllers/users'
import MongooseUserView from './models/mongoose/view'
import userProviders from './providers'
import UsersResolver from './resolvers/users'

const controllers = [UsersController]

const commandHandlers = [CreateUserHandler]
const eventHandlers = [UserCreatedHandler]
const queryHandlers = [GetUsersHandler, GetUserHandler]
const resolvers = [UsersResolver]

const eventFactories = {
  UserCreated: ({
    email,
    id,
    name,
  }: {
    email: string
    id: string
    name: string
  }) => UserCreated.with({ email, id, name }),
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
        name: MongooseUserView.name,
        schema: SchemaFactory.createForClass(MongooseUserView),
      },
    ]),
  ],
  providers: [
    ...commandHandlers,
    ...eventHandlers,
    ...queryHandlers,
    ...resolvers,
    ...userProviders,
  ],
})
class UserModule {
  constructor(private readonly eventStorePublisher: EventStorePublisher) {}

  onModuleInit() {
    this.eventStorePublisher.addEventFactories(eventFactories)
  }
}

export default UserModule
