import { itIsNamed } from '~/test/closures/shared/name-type'

import CreateWorkout from './create-workout'

describe('CreateWorkout', () => {
  const __name__ = 'CreateWorkout'
  const id = 'id'
  const exerciseId = 'exerciseId'
  const reps = 3
  const sets = 10
  const createWorkout = CreateWorkout.with({ exerciseId, id, reps, sets })

  itIsNamed(createWorkout)

  it.concurrent('has an id', () => {
    expect(createWorkout).toHaveProperty('id')
  })

  it.concurrent('has an exercise id', () => {
    expect(createWorkout).toHaveProperty('exerciseId')
  })

  it.concurrent('has reps', () => {
    expect(createWorkout).toHaveProperty('reps')
  })

  it.concurrent('has sets', () => {
    expect(createWorkout).toHaveProperty('sets')
  })

  it.concurrent('can be created', () => {
    expect(createWorkout.__name__).toBe(__name__)
    expect(createWorkout.id).toBe(id)
    expect(createWorkout.exerciseId).toBe(exerciseId)
    expect(createWorkout.reps).toBe(reps)
    expect(createWorkout.sets).toBe(sets)
  })
})
