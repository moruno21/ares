import { itIsNamed } from '~/test/closures/shared/name-type'

import GetExercise from './get-exercise'

describe('GetExercise', () => {
  const __name__ = 'GetExercise'
  const id = 'id'
  const getExercise = GetExercise.with({ id })

  itIsNamed(getExercise)

  it.concurrent('has an id', () => {
    expect(getExercise).toHaveProperty('id')
  })

  it.concurrent('can be created', () => {
    expect(getExercise.__name__).toBe(__name__)
    expect(getExercise.id).toBe(id)
  })
})
