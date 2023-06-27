import { itIsAnException } from '~/test/closures/shared/domain/exception'

import InvalidExerciseName from './invalid-name'

describe('InvalidExerciseName', () => {
  const __name__ = 'InvalidExerciseName'

  describe('Blank', () => {
    const invalidName = InvalidExerciseName.causeIsBlank()

    itIsAnException(invalidName)

    it.concurrent('can be cause it is blank', () => {
      expect(invalidName.__name__).toBe(__name__)
      expect(invalidName.code).toBe('blank')
      expect(invalidName.message).toBe('Exercise name cannot be blank')
    })
  })

  describe('TooLong', () => {
    const invalidName = InvalidExerciseName.causeIsTooLong()

    itIsAnException(invalidName)

    it.concurrent('can be cause it is too long', () => {
      expect(invalidName.__name__).toBe(__name__)
      expect(invalidName.code).toBe('too_long_name')
      expect(invalidName.message).toBe(
        'Exercise name cannot be longer than 50 characters',
      )
    })
  })
})
