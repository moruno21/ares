import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import ExerciseViews from '~/exercise/application/services/views'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import RoutineWorkoutsChanged from '~/routine/domain/events/routine-workouts-changed'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either from '~/shared/either'

import RoutineViews from '../services/views'

@EventsHandler(RoutineWorkoutsChanged)
class RoutineWorkoutsChangedHandler
  implements IEventHandler<RoutineWorkoutsChanged>
{
  constructor(
    @Inject(ExerciseViews) private readonly exerciseViews: ExerciseViews,
    @Inject(RoutineViews) private readonly views: RoutineViews,
  ) {}

  async handle(
    event: RoutineWorkoutsChanged,
  ): Promise<Either<NotFoundExercise | NotFoundRoutine, void>> {
    const routineView = await this.views.withId(event.id)

    if (Either.isLeft(routineView))
      return Either.left(NotFoundRoutine.withId(event.id))

    const workouts = []

    for (const workout of event.workouts) {
      const exercise = await this.exerciseViews.withId(workout.exerciseId)

      if (Either.isLeft(exercise)) return Either.left(exercise.value)

      workouts.push({
        exerciseId: workout.exerciseId,
        exerciseName: exercise.value.name,
        reps: workout.reps,
        sets: workout.sets,
      })
    }

    await this.views.changeWorkouts(routineView.value.id, workouts)
  }
}

export default RoutineWorkoutsChangedHandler
