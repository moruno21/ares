import { itIsNamed } from '~/test/closures/shared/name-type'

import DeleteExercise from './delete-exercise'

describe('DeleteExercise', () => {
  const __name__ = 'DeleteExercise'
  const id = 'id'
  const deleteExercise = DeleteExercise.with({ id })

  itIsNamed(deleteExercise)

  it.concurrent('has an id', () => {
    expect(deleteExercise).toHaveProperty('id')
  })

  it.concurrent('can be deleted', () => {
    expect(deleteExercise.__name__).toBe(__name__)
    expect(deleteExercise.id).toBe(id)
  })
})
