import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'

import Either from '~/shared/either'
import Uuid from '~/shared/uuid'
import CreateUser from '~/user/application/commands/create-user'
import CreateUserHandler from '~/user/application/commands/handlers/create-user'
import GetUser from '~/user/application/queries/get-user'
import GetUsers from '~/user/application/queries/get-users'
import GetUserHandler from '~/user/application/queries/handlers/get-user'
import GetUsersHandler from '~/user/application/queries/handlers/get-users'

import { User, UserInput } from '../models/graphql/model'
import UserDto from '../models/http/dto'

@Resolver(() => User)
class UsersResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [User])
  async users(): Promise<UserDto[]> {
    const response: Awaited<ReturnType<GetUsersHandler['execute']>> =
      await this.queryBus.execute(GetUsers.all())

    return response.map((userView) => UserDto.fromUserView(userView))
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<UserDto | GraphQLError> {
    const response: Awaited<ReturnType<GetUserHandler['execute']>> =
      await this.queryBus.execute(GetUser.with({ id }))

    if (Either.isLeft(response))
      return new GraphQLError(response.value[0].message, {
        extensions: { code: response.value[0].code },
      })

    return UserDto.fromUserView(response.value)
  }

  @Mutation(() => User)
  async createUser(
    @Args('userInput') userInput: UserInput,
  ): Promise<UserDto | GraphQLError> {
    const id = Uuid.generate()

    const response: Awaited<ReturnType<CreateUserHandler['execute']>> =
      await this.commandBus.execute(
        CreateUser.with({
          email: userInput.email,
          id,
        }),
      )

    if (Either.isLeft(response))
      return new GraphQLError(response.value[0].message, {
        extensions: { code: response.value[0].code },
      })

    return UserDto.fromUser(response.value)
  }
}

export default UsersResolver
