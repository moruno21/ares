import { itIsNamed } from '~/test/closures/shared/name-type'

import GetExercises from './get-exercises'

describe('GetExercises', () => {
  const __name__ = 'GetExercises'
  const getExercises = GetExercises.all()

  itIsNamed(getExercises)

  it.concurrent('can be created', () => {
    expect(getExercises.__name__).toBe(__name__)
  })
})
