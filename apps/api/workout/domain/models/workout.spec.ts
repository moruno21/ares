import ExerciseId from '~/exercise/domain/models/id'
import { itIsAnEntity } from '~/test/closures/shared/domain/entity'

import WorkoutId from './id'
import WorkoutReps from './reps'
import WorkoutSets from './sets'
import Workout from './workout'

describe('Workout', () => {
  const __name__ = 'Workout'
  const id = WorkoutId.fromString('55116874-44a5-47fe-8b3f-8a0bc34a832b')
    .value as WorkoutId
  const exerciseId = ExerciseId.fromString(
    '5036d559-8712-4bdc-b0e0-a096e94ece33',
  ).value as ExerciseId
  const reps = WorkoutReps.fromNumber(10).value as WorkoutReps
  const sets = WorkoutSets.fromNumber(4).value as WorkoutSets
  const workout = Workout.create({ exerciseId, id, reps, sets })

  itIsAnEntity(workout)

  it.concurrent('has an exercise id', () => {
    expect(workout).toHaveProperty('exerciseId')
  })

  it.concurrent('has reps', () => {
    expect(workout).toHaveProperty('reps')
  })

  it.concurrent('has sets', () => {
    expect(workout).toHaveProperty('sets')
  })

  it.concurrent('has an isdeleted', () => {
    expect(workout).toHaveProperty('isDeleted')
  })

  it.concurrent('can be created', () => {
    expect(workout.__name__).toBe(__name__)
    expect(workout.id).toStrictEqual(id)
    expect(workout.exerciseId).toStrictEqual(exerciseId)
    expect(workout.reps).toStrictEqual(reps)
    expect(workout.sets).toStrictEqual(sets)
    expect(workout.isDeleted).toBe(false)
  })
})
