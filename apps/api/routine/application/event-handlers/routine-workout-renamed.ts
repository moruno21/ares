import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import RoutineViews from '~/routine/application/services/views'
import RoutineWorkoutRenamed from '~/routine/domain/events/routine-workout-renamed'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either from '~/shared/either'

@EventsHandler(RoutineWorkoutRenamed)
class RoutineWorkoutRenamedHandler
  implements IEventHandler<RoutineWorkoutRenamed>
{
  constructor(@Inject(RoutineViews) private readonly views: RoutineViews) {}

  async handle(event: RoutineWorkoutRenamed) {
    const routineView = await this.views.withId(event.id)

    if (Either.isLeft(routineView))
      return Either.left(NotFoundRoutine.withId(event.id))

    await this.views.changeWorkouts(
      routineView.value.id,
      routineView.value.workouts.map((workout) =>
        workout.exerciseId === event.workout.exerciseId
          ? { ...workout, exerciseName: event.workout.exerciseName }
          : workout,
      ),
    )
  }
}

export default RoutineWorkoutRenamedHandler
