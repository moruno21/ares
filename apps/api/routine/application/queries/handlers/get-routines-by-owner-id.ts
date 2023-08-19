import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'
import UserViews from '~/user/application/services/views'
import NotFoundUser from '~/user/domain/exceptions/not-found'
import UserId from '~/user/domain/models/id'

import RoutineView from '../../models/view'
import RoutineViews from '../../services/views'
import GetRoutinesByOwnerId from '../get-routines-by-owner-id'

@QueryHandler(GetRoutinesByOwnerId)
class GetRoutinesByOwnerIdHandler implements IQueryHandler {
  constructor(
    @Inject(RoutineViews) private readonly routineViews: RoutineViews,
    @Inject(UserViews) private readonly userViews: UserViews,
  ) {}

  async execute(
    query: GetRoutinesByOwnerId,
  ): Promise<Either<(InvalidUuid | NotFoundUser)[], RoutineView[]>> {
    const id = UserId.fromString(query.ownerId)
    const isInvalidId = Either.isLeft(id)

    const userView =
      !isInvalidId && (await this.userViews.withId(id.value.value))
    const notFoundUser = Either.isLeft(userView)

    const exceptions = []
    if (isInvalidId) exceptions.push(id.value)
    if (notFoundUser) exceptions.push(userView.value)
    if (isInvalidId || notFoundUser) return Either.left(exceptions)

    return Either.right(await this.routineViews.withOwnerId(id.value.value))
  }
}

export default GetRoutinesByOwnerIdHandler
