import { itIsNamed } from '~/test/closures/shared/name-type'

import WorkoutView from './view'

describe('WorkoutView', () => {
  const __name__ = 'WorkoutView'
  const id = 'id'
  const exerciseId = 'exerciseId'
  const reps = 6
  const sets = 3
  const view = WorkoutView.with({ exerciseId, id, reps, sets })

  itIsNamed(view)

  it.concurrent('has an id', () => {
    expect(view).toHaveProperty('id')
  })

  it.concurrent('has an exercise id', () => {
    expect(view).toHaveProperty('exerciseId')
  })

  it.concurrent('has reps', () => {
    expect(view).toHaveProperty('reps')
  })

  it.concurrent('has sets', () => {
    expect(view).toHaveProperty('sets')
  })

  it.concurrent('can be created', () => {
    expect(view.__name__).toBe(__name__)
    expect(view.id).toBe(id)
    expect(view.exerciseId).toBe(exerciseId)
    expect(view.reps).toBe(reps)
    expect(view.sets).toBe(sets)
  })
})
