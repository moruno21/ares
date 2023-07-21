import { itIsNamed } from '~/test/closures/shared/name-type'

import WorkoutCreated from './workout-created'

describe('WorkoutCreated', () => {
  const __name__ = 'WorkoutCreated'
  const id = 'id'
  const exerciseId = 'exerciseId'
  const reps = 8
  const sets = 4
  const workoutCreated = WorkoutCreated.with({ exerciseId, id, reps, sets })

  itIsNamed(workoutCreated)

  it.concurrent('has an id', () => {
    expect(workoutCreated).toHaveProperty('id')
  })

  it.concurrent('has an exercise id', () => {
    expect(workoutCreated).toHaveProperty('exerciseId')
  })

  it.concurrent('has reps', () => {
    expect(workoutCreated).toHaveProperty('reps')
  })

  it.concurrent('has sets', () => {
    expect(workoutCreated).toHaveProperty('sets')
  })

  it.concurrent('can be created', () => {
    expect(workoutCreated.__name__).toBe(__name__)
    expect(workoutCreated.id).toBe(id)
    expect(workoutCreated.exerciseId).toBe(exerciseId)
    expect(workoutCreated.reps).toBe(reps)
    expect(workoutCreated.sets).toBe(sets)
  })
})
