import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import ExerciseId from '~/exercise/domain/models/id'
import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'

import ExerciseView from '../../models/view'
import ExerciseViews from '../../services/views'
import GetExercise from '../get-exercise'

@QueryHandler(GetExercise)
class GetExerciseHandler implements IQueryHandler {
  constructor(@Inject(ExerciseViews) private readonly views: ExerciseViews) {}

  async execute(
    query: GetExercise,
  ): Promise<Either<InvalidUuid | NotFoundExercise, ExerciseView>> {
    const id = ExerciseId.fromString(query.id)

    const isInvalidId = Either.isLeft(id)
    if (isInvalidId) return Either.left(id.value)

    const exerciseView = await this.views.withId(id.value.value)

    const exerciseNotFound = Either.isLeft(exerciseView)
    if (exerciseNotFound) return Either.left(exerciseView.value)

    return Either.right(exerciseView.value)
  }
}

export default GetExerciseHandler
