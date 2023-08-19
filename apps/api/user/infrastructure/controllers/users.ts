import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import Either from '~/shared/either'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'
import CreateUser from '~/user/application/commands/create-user'
import CreateUserHandler from '~/user/application/commands/handlers/create-user'
import GetUserById from '~/user/application/queries/get-user-by-id'
import GetUsers from '~/user/application/queries/get-users'
import GetUserByIdHandler from '~/user/application/queries/handlers/get-user-by-id'
import GetUsersHandler from '~/user/application/queries/handlers/get-users'

import UserDto from '../models/http/dto'
import PostUserDto from '../models/http/post-dto'

@ApiTags('Users')
@Controller('users')
class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Gets all Users' })
  @ApiOkResponse({
    description: 'Users',
    type: [UserDto],
  })
  @Get()
  async getUsers(): Promise<UserDto[]> {
    const response: Awaited<ReturnType<GetUsersHandler['execute']>> =
      await this.queryBus.execute(GetUsers.all())

    return response.map((userView) => UserDto.fromUserView(userView))
  }
  @ApiOperation({ summary: 'Gets an User' })
  @ApiOkResponse({
    description: 'User',
    type: UserDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  @Get(':id')
  async getUser(
    @Param('id') id: string,
  ): Promise<UserDto | BadRequestException> {
    const response: Awaited<ReturnType<GetUserByIdHandler['execute']>> =
      await this.queryBus.execute(GetUserById.with({ id }))

    if (Either.isLeft(response))
      throw new BadRequestException(HttpError.fromExceptions(response.value))

    return UserDto.fromUserView(response.value)
  }

  @ApiOperation({ summary: 'Creates an User' })
  @ApiCreatedResponse({
    description: 'User created',
    type: UserDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Post()
  async createUser(
    @Body() dto: PostUserDto,
  ): Promise<UserDto | BadRequestException> {
    const response: Awaited<ReturnType<CreateUserHandler['execute']>> =
      await this.commandBus.execute(
        CreateUser.with({
          email: dto.email,
          id: Uuid.generate(),
        }),
      )

    if (Either.isLeft(response))
      throw new BadRequestException(HttpError.fromExceptions(response.value))

    return UserDto.fromUser(response.value)
  }
}

export default UsersController
