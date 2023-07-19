import { itIsAnException } from '~/test/closures/shared/domain/exception'

import InvalidExerciseDescription from './invalid-description'

describe('InvalidExerciseDescription', () => {
  const __name__ = 'InvalidExerciseDescription'

  describe('TooLong', () => {
    const invalidDescription = InvalidExerciseDescription.causeIsTooLong()

    itIsAnException(invalidDescription)

    it.concurrent('can be cause it is too long', () => {
      expect(invalidDescription.__name__).toBe(__name__)
      expect(invalidDescription.code).toBe('too_long')
      expect(invalidDescription.message).toBe(
        'Exercise description cannot be longer than 250 characters',
      )
    })
  })
})
