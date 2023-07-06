import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import ExerciseDeleted from '~/exercise/domain/events/exercise-deleted'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import Either from '~/shared/either'

import ExerciseViews from '../services/views'

@EventsHandler(ExerciseDeleted)
class ExerciseDeletedHandler implements IEventHandler<ExerciseDeleted> {
  constructor(@Inject(ExerciseViews) private readonly views: ExerciseViews) {}

  async handle(
    event: ExerciseDeleted,
  ): Promise<Either<NotFoundExercise, void>> {
    const exerciseView = await this.views.withId(event.id)

    if (Either.isLeft(exerciseView)) {
      console.log('holaaa')

      return Either.left(NotFoundExercise.withId(event.id))
    }

    await this.views.delete(exerciseView.value)
  }
}

export default ExerciseDeletedHandler
