import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import ExerciseRedescribed from '~/exercise/domain/events/exercise-redescribed'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import Either from '~/shared/either'

import ExerciseViews from '../services/views'

@EventsHandler(ExerciseRedescribed)
class ExerciseRedescribedHandler implements IEventHandler<ExerciseRedescribed> {
  constructor(@Inject(ExerciseViews) private readonly views: ExerciseViews) {}

  async handle(
    event: ExerciseRedescribed,
  ): Promise<Either<NotFoundExercise, void>> {
    const exerciseView = await this.views.withId(event.id)

    if (Either.isLeft(exerciseView))
      return Either.left(NotFoundExercise.withId(event.id))

    await this.views.redescribe(exerciseView.value.id, event.description)
  }
}

export default ExerciseRedescribedHandler
