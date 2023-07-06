import { itIsNamed } from '~/test/closures/shared/name-type'

import ExerciseDeleted from './exercise-deleted'

describe('ExerciseDeleted', () => {
  const __name__ = 'ExerciseDeleted'
  const id = 'id'
  const exerciseDeleted = ExerciseDeleted.with({ id })

  itIsNamed(exerciseDeleted)

  it.concurrent('has an id', () => {
    expect(exerciseDeleted).toHaveProperty('id')
  })

  it.concurrent('can be created', () => {
    expect(exerciseDeleted.__name__).toBe(__name__)
    expect(exerciseDeleted.id).toBe(id)
  })
})
