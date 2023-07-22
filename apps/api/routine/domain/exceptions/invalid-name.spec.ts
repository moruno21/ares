import { itIsAnException } from '~/test/closures/shared/domain/exception'

import InvalidRoutineName from './invalid-name'

describe('InvalidRoutineName', () => {
  const __name__ = 'InvalidRoutineName'

  describe('Blank', () => {
    const invalidName = InvalidRoutineName.causeIsBlank()

    itIsAnException(invalidName)

    it.concurrent('can be cause it is blank', () => {
      expect(invalidName.__name__).toBe(__name__)
      expect(invalidName.code).toBe('blank')
      expect(invalidName.message).toBe('Routine name cannot be blank')
    })
  })

  describe('TooLong', () => {
    const invalidName = InvalidRoutineName.causeIsTooLong()

    itIsAnException(invalidName)

    it.concurrent('can be cause it is too long', () => {
      expect(invalidName.__name__).toBe(__name__)
      expect(invalidName.code).toBe('too_long')
      expect(invalidName.message).toBe(
        'Routine name cannot be longer than 50 characters',
      )
    })
  })
})
