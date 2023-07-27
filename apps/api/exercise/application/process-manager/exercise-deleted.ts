import { Inject } from '@nestjs/common'
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs'

import ExerciseDeleted from '~/exercise/domain/events/exercise-deleted'
import RoutineViews from '~/routine/application/services/views'
import RoutineWorkoutDeleted from '~/routine/domain/events/routine-workout-deleted'

@EventsHandler(ExerciseDeleted)
class ExerciseDeletedProcessManager implements IEventHandler<ExerciseDeleted> {
  constructor(
    private readonly eventBus: EventBus,
    @Inject(RoutineViews) private readonly routineViews: RoutineViews,
  ) {}

  async handle(event: ExerciseDeleted) {
    const routineViews = await this.routineViews.withExercise(event.id)

    if (routineViews.length < 1) return

    routineViews.map((routineView) =>
      routineView.workouts.map((workout) => {
        if (workout.exerciseId === event.id)
          return this.eventBus.publish(
            RoutineWorkoutDeleted.with({
              id: routineView.id,
              workout,
            }).withStream('Routine'),
          )
      }),
    )
  }
}

export default ExerciseDeletedProcessManager
