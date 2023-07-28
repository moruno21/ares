import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import ExerciseViews from '~/exercise/application/services/views'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import RoutineCreated from '~/routine/domain/events/routine-created'
import Either from '~/shared/either'

import RoutineView from '../models/view'
import RoutineViews from '../services/views'

@EventsHandler(RoutineCreated)
class RoutineCreatedHandler implements IEventHandler<RoutineCreated> {
  constructor(
    @Inject(ExerciseViews) private readonly exerciseViews: ExerciseViews,
    @Inject(RoutineViews) private readonly routineViews: RoutineViews,
  ) {}

  async handle(event: RoutineCreated): Promise<Either<NotFoundExercise, void>> {
    const workouts = []

    for (const workout of event.workouts) {
      const exercise = await this.exerciseViews.withId(workout.exerciseId)

      if (Either.isLeft(exercise)) return Either.left(exercise.value)

      workouts.push({
        exerciseDescription: exercise.value.description,
        exerciseId: workout.exerciseId,
        exerciseName: exercise.value.name,
        reps: workout.reps,
        sets: workout.sets,
      })
    }

    await this.routineViews.add(
      RoutineView.with({
        description: event.description,
        id: event.id,
        name: event.name,
        workouts,
      }),
    )
  }
}

export default RoutineCreatedHandler
