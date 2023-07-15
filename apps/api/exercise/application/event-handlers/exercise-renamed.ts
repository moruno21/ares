import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import ExerciseRenamed from '~/exercise/domain/events/exercise-renamed'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import Either from '~/shared/either'

import ExerciseViews from '../services/views'

@EventsHandler(ExerciseRenamed)
class ExerciseRenamedHandler implements IEventHandler<ExerciseRenamed> {
  constructor(@Inject(ExerciseViews) private readonly views: ExerciseViews) {}

  async handle(
    event: ExerciseRenamed,
  ): Promise<Either<NotFoundExercise, void>> {
    const exerciseView = await this.views.withId(event.id)

    if (Either.isLeft(exerciseView))
      return Either.left(NotFoundExercise.withId(event.id))

    await this.views.rename(exerciseView.value.id, event.name)
  }
}

export default ExerciseRenamedHandler
