import { itIsAnException } from '~/test/closures/shared/domain/exception'

import InvalidWorkoutReps from './invalid-reps'

describe('InvalidWorkoutReps', () => {
  const __name__ = 'InvalidWorkoutReps'

  describe('NonPositive', () => {
    const invalidReps = InvalidWorkoutReps.causeIsNonPositive()

    itIsAnException(invalidReps)

    it.concurrent('can be cause it is non positive', () => {
      expect(invalidReps.__name__).toBe(__name__)
      expect(invalidReps.code).toBe('non_positive')
      expect(invalidReps.message).toBe('Workout reps cannot be non positive')
    })
  })

  describe('TooHigh', () => {
    const invalidReps = InvalidWorkoutReps.causeIsTooHigh()

    itIsAnException(invalidReps)

    it.concurrent('can be cause it is too high', () => {
      expect(invalidReps.__name__).toBe(__name__)
      expect(invalidReps.code).toBe('too_high')
      expect(invalidReps.message).toBe('Workout reps cannot be higher than 100')
    })
  })
})
