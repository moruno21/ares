import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import Either from '~/shared/either'
import NotFoundUser from '~/user/domain/exceptions/not-found'
import UserEmail from '~/user/domain/models/email'

import UserView from '../../models/view'
import UserViews from '../../services/views'
import GetUserByEmail from '../get-user-by-email'

@QueryHandler(GetUserByEmail)
class GetUserByEmailHandler implements IQueryHandler {
  constructor(@Inject(UserViews) private readonly views: UserViews) {}

  async execute(
    query: GetUserByEmail,
  ): Promise<Either<NotFoundUser[], UserView>> {
    const email = UserEmail.fromString(query.email)

    const userView = await this.views.withEmail(email.value)
    const userNotFound = Either.isLeft(userView)

    const exceptions = []
    if (userNotFound) exceptions.push(userView.value)

    if (userNotFound) return Either.left(exceptions)

    return Either.right(userView.value)
  }
}

export default GetUserByEmailHandler
