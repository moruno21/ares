import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import RoutineViews from '~/routine/application/services/views'
import RoutineWorkoutRedescribed from '~/routine/domain/events/routine-workout-redescribed'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either from '~/shared/either'

@EventsHandler(RoutineWorkoutRedescribed)
class RoutineWorkoutRedescribedHandler
  implements IEventHandler<RoutineWorkoutRedescribed>
{
  constructor(@Inject(RoutineViews) private readonly views: RoutineViews) {}

  async handle(event: RoutineWorkoutRedescribed) {
    const routineView = await this.views.withId(event.id)

    if (Either.isLeft(routineView))
      return Either.left(NotFoundRoutine.withId(event.id))

    await this.views.changeWorkouts(
      routineView.value.id,
      routineView.value.workouts.map((workout) =>
        workout.exerciseId === event.workout.exerciseId
          ? {
              ...workout,
              exerciseDescription: event.workout.exerciseDescription,
            }
          : workout,
      ),
    )
  }
}

export default RoutineWorkoutRedescribedHandler
