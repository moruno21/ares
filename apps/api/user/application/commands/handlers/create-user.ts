import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'
import NotCreatedUser from '~/user/domain/exceptions/not-created'
import UserEmail from '~/user/domain/models/email'
import UserId from '~/user/domain/models/id'
import UserName from '~/user/domain/models/name'
import User from '~/user/domain/models/user'
import Users from '~/user/domain/services/users'

import UserViews from '../../services/views'
import CreateUser from '../create-user'

@CommandHandler(CreateUser)
class CreateUserHandler implements ICommandHandler {
  constructor(
    @Inject(Users) private readonly users: Users,
    @Inject(UserViews) private readonly views: UserViews,
  ) {}

  async execute(
    command: CreateUser,
  ): Promise<Either<(InvalidUuid | NotCreatedUser)[], User>> {
    const id = UserId.fromString(command.id)
    const isInvalidId = Either.isLeft(id)

    const email = UserEmail.fromString(command.email)

    const name = UserName.fromString(
      command.email.substring(0, command.email.indexOf('@')),
    )

    const existsWithEmail = Either.isRight(
      await this.views.withEmail(email.value),
    )

    const exceptions = []
    if (isInvalidId) exceptions.push(id.value)
    if (existsWithEmail)
      exceptions.push(
        NotCreatedUser.causeAlreadyExistsOneWithEmail(email.value),
      )

    if (isInvalidId || existsWithEmail) return Either.left(exceptions)

    const user = User.create({
      email,
      id: id.value,
      name,
    })

    this.users.save(user)

    return Either.right(user)
  }
}

export default CreateUserHandler
