import { BadRequestException } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'
import CommandBusMock from '~/test/mocks/@nestjs/cqrs/command-bus'
import QueryBusMock from '~/test/mocks/@nestjs/cqrs/query-bus'
import CreateUser from '~/user/application/commands/create-user'
import UserView from '~/user/application/models/view'
import GetUserById from '~/user/application/queries/get-user-by-id'
import GetUsers from '~/user/application/queries/get-users'
import NotFoundUser from '~/user/domain/exceptions/not-found'
import UserEmail from '~/user/domain/models/email'
import UserId from '~/user/domain/models/id'
import UserName from '~/user/domain/models/name'
import User from '~/user/domain/models/user'
import UserDto from '~/user/infrastructure/models/http/dto'
import PostUserDto from '~/user/infrastructure/models/http/post-dto'

import UsersController from './users'

describe('UsersController', () => {
  let commandBus: CommandBus
  let queryBus: QueryBus
  let usersController: UsersController

  describe('GetUsers', () => {
    const id = '0cfddce8-0ce3-448a-a661-e12a38eeac26'
    const email = 'name@gmail.com'
    const name = 'name'

    const userViewOne = UserView.with({
      email,
      id,
      name,
    })
    const userViewTwo = UserView.with({
      email,
      id,
      name,
    })

    beforeEach(() => {
      queryBus = QueryBusMock.mock()
      usersController = new UsersController(commandBus, queryBus)
    })

    it('gets all the users', async () => {
      const queryBusExecute = jest.spyOn(queryBus, 'execute')
      const userViews = [userViewOne, userViewTwo]

      queryBusExecute.mockResolvedValue(userViews)

      const users = userViews.map((userView) => UserDto.fromUserView(userView))

      const response = await usersController.getUsers()

      expect(queryBusExecute).toHaveBeenCalledWith(GetUsers.all())
      expect(response).toStrictEqual(users)
    })

    it('returns an empty value when there are no users', async () => {
      const queryBusExecute = jest.spyOn(queryBus, 'execute')

      queryBusExecute.mockResolvedValue([])

      const response = await usersController.getUsers()

      expect(queryBusExecute).toHaveBeenCalledWith(GetUsers.all())
      expect(response).toStrictEqual([])
    })
  })

  describe('GetUserById', () => {
    const id = 'b3a50b83-bb5b-4b4e-a94b-49e015a3ecba'
    const email = 'name@gmail.com'
    const name = 'name'

    const userView = UserView.with({ email, id, name })

    beforeEach(() => {
      queryBus = QueryBusMock.mock()
      usersController = new UsersController(commandBus, queryBus)
    })

    it('gets an user from an id', async () => {
      const queryBusExecute = jest.spyOn(queryBus, 'execute')

      queryBusExecute.mockResolvedValue(Either.right(userView))

      const user = UserDto.fromUserView(userView)

      const response = (await usersController.getUser(id)) as UserDto

      expect(queryBusExecute).toHaveBeenCalledWith(GetUserById.with({ id }))
      expect(response.id).toStrictEqual(user.id)
      expect(response.name).toStrictEqual(user.name)
      expect(response.email).toStrictEqual(user.email)
    })

    it('cannot get an user from an invalid id', async () => {
      const queryBusExecute = jest.spyOn(queryBus, 'execute')
      const invalidUuid = 'invalidUuid'
      const exceptions = [InvalidUuid.causeTheFormatIsNotValid('invalidUuid')]

      queryBusExecute.mockResolvedValue(Either.left(exceptions))

      const response = usersController.getUser(invalidUuid)

      expect(queryBusExecute).toHaveBeenCalledWith(
        GetUserById.with({ id: invalidUuid }),
      )
      await expect(response).rejects.toThrow(
        new BadRequestException(HttpError.fromExceptions(exceptions)),
      )
    })

    it('cannot get an user that does not exist', async () => {
      const queryBusExecute = jest.spyOn(queryBus, 'execute')
      const nonExistentUuid = 'ef1bba65-6edd-440f-855c-ea85d923a63b'
      const exceptions = [NotFoundUser.withId(nonExistentUuid)]

      queryBusExecute.mockResolvedValue(Either.left(exceptions))

      const response = usersController.getUser(nonExistentUuid)

      expect(queryBusExecute).toHaveBeenCalledWith(
        GetUserById.with({ id: nonExistentUuid }),
      )
      await expect(response).rejects.toThrow(
        new BadRequestException(HttpError.fromExceptions(exceptions)),
      )
    })
  })

  describe('PostUser', () => {
    const idValue = '7ed85441-9e84-4d23-ad0f-d58b1e37960d'
    const id = UserId.fromString(idValue).value as UserId
    const emailValue = 'name@gmail.com'
    const email = UserEmail.fromString(emailValue)
    const nameValue = 'name'
    const name = UserName.fromString(nameValue)
    const user = User.create({ email, id, name })
    const dto = UserDto.fromUser(user)

    beforeEach(() => {
      commandBus = CommandBusMock.mock()
      usersController = new UsersController(commandBus, queryBus)
    })

    it('creates an user', async () => {
      const uuidGenerate = jest.spyOn(Uuid, 'generate')
      const commandBusExecute = jest.spyOn(commandBus, 'execute')

      uuidGenerate.mockReturnValue(idValue)
      commandBusExecute.mockResolvedValue(Either.right(user))

      const response = (await usersController.createUser(
        PostUserDto.with({
          email: emailValue,
        }),
      )) as UserDto

      expect(uuidGenerate).toHaveBeenCalled()
      expect(commandBusExecute).toHaveBeenCalledWith(
        CreateUser.with({
          email: emailValue,
          id: idValue,
        }),
      )
      expect(response.id).toBe(dto.id)
      expect(response.name).toBe(dto.name)
      expect(response.email).toBe(dto.email)
    })
  })
})
