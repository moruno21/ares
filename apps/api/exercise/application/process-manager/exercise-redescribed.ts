import { Inject } from '@nestjs/common'
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs'

import ExerciseRedescribed from '~/exercise/domain/events/exercise-redescribed'
import RoutineViews from '~/routine/application/services/views'
import RoutineWorkoutRedescribed from '~/routine/domain/events/routine-workout-redescribed'

@EventsHandler(ExerciseRedescribed)
class ExerciseRedescribedProcessManager
  implements IEventHandler<ExerciseRedescribed>
{
  constructor(
    private readonly eventBus: EventBus,
    @Inject(RoutineViews) private readonly routineViews: RoutineViews,
  ) {}

  async handle(event: ExerciseRedescribed) {
    const routineViews = await this.routineViews.withExercise(event.id)

    if (routineViews.length < 1) return

    routineViews.map((routineView) =>
      routineView.workouts.map((workout) => {
        if (workout.exerciseId === event.id)
          return this.eventBus.publish(
            RoutineWorkoutRedescribed.with({
              id: routineView.id,
              workout: {
                exerciseDescription: event.description,
                exerciseId: event.id,
              },
            }).withStream('Routine'),
          )
      }),
    )
  }
}

export default ExerciseRedescribedProcessManager
