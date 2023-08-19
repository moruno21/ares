import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import RoutineId from '~/routine/domain/models/id'
import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'

import RoutineView from '../../models/view'
import RoutineViews from '../../services/views'
import GetRoutine from '../get-routine'

@QueryHandler(GetRoutine)
class GetRoutineHandler implements IQueryHandler {
  constructor(@Inject(RoutineViews) private readonly views: RoutineViews) {}

  async execute(
    query: GetRoutine,
  ): Promise<Either<(InvalidUuid | NotFoundRoutine)[], RoutineView>> {
    const id = RoutineId.fromString(query.id)
    const isInvalidId = Either.isLeft(id)

    const routineView =
      !isInvalidId && (await this.views.withId(id.value.value))
    const routineNotFound = Either.isLeft(routineView)

    const exceptions = []
    if (isInvalidId) exceptions.push(id.value)
    if (routineNotFound) exceptions.push(routineView.value)
    if (isInvalidId || routineNotFound) return Either.left(exceptions)

    return Either.right(routineView.value)
  }
}

export default GetRoutineHandler
