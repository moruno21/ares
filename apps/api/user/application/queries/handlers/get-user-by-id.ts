import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'
import NotFoundUser from '~/user/domain/exceptions/not-found'
import UserId from '~/user/domain/models/id'

import UserView from '../../models/view'
import UserViews from '../../services/views'
import GetUserById from '../get-user-by-id'

@QueryHandler(GetUserById)
class GetUserByIdHandler implements IQueryHandler {
  constructor(@Inject(UserViews) private readonly views: UserViews) {}

  async execute(
    query: GetUserById,
  ): Promise<Either<(InvalidUuid | NotFoundUser)[], UserView>> {
    const id = UserId.fromString(query.id)
    const isInvalidId = Either.isLeft(id)

    const userView = !isInvalidId && (await this.views.withId(id.value.value))
    const userNotFound = Either.isLeft(userView)

    const exceptions = []
    if (isInvalidId) exceptions.push(id.value)
    if (userNotFound) exceptions.push(userView.value)
    if (isInvalidId || userNotFound) return Either.left(exceptions)

    return Either.right(userView.value)
  }
}

export default GetUserByIdHandler
