import { itIsAnException } from '~/test/closures/shared/domain/exception'

import InvalidWorkoutSets from './invalid-sets'

describe('InvalidWorkoutSets', () => {
  const __name__ = 'InvalidWorkoutSets'

  describe('NonPositive', () => {
    const invalidSets = InvalidWorkoutSets.causeIsNonPositive()

    itIsAnException(invalidSets)

    it.concurrent('can be cause it is non positive', () => {
      expect(invalidSets.__name__).toBe(__name__)
      expect(invalidSets.code).toBe('non_positive')
      expect(invalidSets.message).toBe('Workout sets cannot be non positive')
    })
  })

  describe('TooHigh', () => {
    const invalidSets = InvalidWorkoutSets.causeIsTooHigh()

    itIsAnException(invalidSets)

    it.concurrent('can be cause it is too high', () => {
      expect(invalidSets.__name__).toBe(__name__)
      expect(invalidSets.code).toBe('too_high')
      expect(invalidSets.message).toBe('Workout sets cannot be higher than 100')
    })
  })
})
