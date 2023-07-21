import ExerciseId from '~/exercise/domain/models/id'
import { AggregateRoot } from '~/shared/domain'

import WorkoutCreated from '../events/workout-created'
import WorkoutId from './id'
import WorkoutReps from './reps'
import WorkoutSets from './sets'

const __name__ = 'Workout'

class Workout extends AggregateRoot<typeof __name__, WorkoutId> {
  readonly __name__ = __name__

  private _exerciseId: ExerciseId
  private _reps: WorkoutReps
  private _sets: WorkoutSets
  private _isDeleted: boolean

  get exerciseId(): ExerciseId {
    return this._exerciseId
  }

  get reps(): WorkoutReps {
    return this._reps
  }

  get sets(): WorkoutSets {
    return this._sets
  }

  get isDeleted(): boolean {
    return this._isDeleted
  }

  static create({
    exerciseId,
    id,
    reps,
    sets,
  }: {
    exerciseId: ExerciseId
    id: WorkoutId
    reps: WorkoutReps
    sets: WorkoutSets
  }): Workout {
    const workout = new this()

    workout.apply(
      WorkoutCreated.with({
        exerciseId: exerciseId.value,
        id: id.value,
        reps: reps.value,
        sets: sets.value,
      }),
    )

    return workout
  }

  private onWorkoutCreated(event: WorkoutCreated) {
    this._id = WorkoutId.fromString(event.id).value as WorkoutId
    this._exerciseId = ExerciseId.fromString(event.exerciseId)
      .value as ExerciseId
    this._reps = WorkoutReps.fromNumber(event.reps).value as WorkoutReps
    this._sets = WorkoutSets.fromNumber(event.sets).value as WorkoutSets
    this._isDeleted = false
  }
}

export default Workout
