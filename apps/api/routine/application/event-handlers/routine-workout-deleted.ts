import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import RoutineViews from '~/routine/application/services/views'
import RoutineWorkoutDeleted from '~/routine/domain/events/routine-workout-deleted'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either from '~/shared/either'

@EventsHandler(RoutineWorkoutDeleted)
class RoutineWorkoutDeletedHandler
  implements IEventHandler<RoutineWorkoutDeleted>
{
  constructor(@Inject(RoutineViews) private readonly views: RoutineViews) {}

  async handle(event: RoutineWorkoutDeleted) {
    const routineView = await this.views.withId(event.id)

    if (Either.isLeft(routineView))
      return Either.left(NotFoundRoutine.withId(event.id))

    await this.views.changeWorkouts(
      routineView.value.id,
      routineView.value.workouts.filter(
        (workout) => workout.exerciseId !== event.workout.exerciseId,
      ),
    )
  }
}

export default RoutineWorkoutDeletedHandler
