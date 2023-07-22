import { itIsAnException } from '~/test/closures/shared/domain/exception'

import InvalidRoutineDescription from './invalid-description'

describe('InvalidRoutineDescription', () => {
  const __name__ = 'InvalidRoutineDescription'

  describe('TooLong', () => {
    const invalidDescription = InvalidRoutineDescription.causeIsTooLong()

    itIsAnException(invalidDescription)

    it.concurrent('can be cause it is too long', () => {
      expect(invalidDescription.__name__).toBe(__name__)
      expect(invalidDescription.code).toBe('too_long')
      expect(invalidDescription.message).toBe(
        'Routine description cannot be longer than 250 characters',
      )
    })
  })
})
