import { Inject } from '@nestjs/common'
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs'

import ExerciseRenamed from '~/exercise/domain/events/exercise-renamed'
import RoutineViews from '~/routine/application/services/views'
import RoutineWorkoutRenamed from '~/routine/domain/events/routine-workout-renamed'

@EventsHandler(ExerciseRenamed)
class ExerciseRenamedProcessManager implements IEventHandler<ExerciseRenamed> {
  constructor(
    private readonly eventBus: EventBus,
    @Inject(RoutineViews) private readonly routineViews: RoutineViews,
  ) {}

  async handle(event: ExerciseRenamed) {
    const routineViews = await this.routineViews.withExercise(event.id)

    if (routineViews.length < 1) return

    routineViews.map((routineView) =>
      routineView.workouts.map((workout) => {
        if (workout.exerciseId === event.id)
          return this.eventBus.publish(
            RoutineWorkoutRenamed.with({
              id: routineView.id,
              workout: { exerciseId: event.id, exerciseName: event.name },
            }).withStream('Routine'),
          )
      }),
    )
  }
}

export default ExerciseRenamedProcessManager
