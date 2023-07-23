import Either, { Left, Right } from '~/shared/either'
import { itIsAValueObject } from '~/test/closures/shared/domain/value-object'

import InvalidWorkoutReps from '../../exceptions/invalid-reps'
import WorkoutReps from './reps'

describe('WorkoutReps', () => {
  const __name__ = 'WorkoutReps'
  const value = 10
  const reps = WorkoutReps.fromNumber(value) as Right<WorkoutReps>

  itIsAValueObject(reps.value)

  it.concurrent('can be created from number', () => {
    expect(Either.isRight(reps)).toBe(true)
    expect(reps.value.__name__).toBe(__name__)
    expect(reps.value.value).toBe(value)
  })

  it.concurrent('cannot be non positive', () => {
    const nonPositiveReps = WorkoutReps.fromNumber(
      0,
    ) as Left<InvalidWorkoutReps>
    const invalidReps = InvalidWorkoutReps.causeIsNonPositive()

    expect(Either.isRight(nonPositiveReps)).toBe(false)
    expect(nonPositiveReps.value.__name__).toBe(invalidReps.__name__)
    expect(nonPositiveReps.value.code).toBe(invalidReps.code)
  })

  it.concurrent('cannot be higher than 100', () => {
    const tooHighReps = WorkoutReps.fromNumber(150) as Left<InvalidWorkoutReps>
    const invalidReps = InvalidWorkoutReps.causeIsTooHigh()

    expect(Either.isRight(tooHighReps)).toBe(false)
    expect(tooHighReps.value.__name__).toBe(invalidReps.__name__)
    expect(tooHighReps.value.code).toBe(invalidReps.code)
  })
})
