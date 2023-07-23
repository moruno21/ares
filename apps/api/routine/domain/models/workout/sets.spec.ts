import Either, { Left, Right } from '~/shared/either'
import { itIsAValueObject } from '~/test/closures/shared/domain/value-object'

import InvalidWorkoutSets from '../../exceptions/invalid-sets'
import WorkoutSets from './sets'

describe('WorkoutSets', () => {
  const __name__ = 'WorkoutSets'
  const value = 3
  const sets = WorkoutSets.fromNumber(value) as Right<WorkoutSets>

  itIsAValueObject(sets.value)

  it.concurrent('can be created from number', () => {
    expect(Either.isRight(sets)).toBe(true)
    expect(sets.value.__name__).toBe(__name__)
    expect(sets.value.value).toBe(value)
  })

  it.concurrent('cannot be non positive', () => {
    const nonPositiveSets = WorkoutSets.fromNumber(
      -3,
    ) as Left<InvalidWorkoutSets>
    const invalidSets = InvalidWorkoutSets.causeIsNonPositive()

    expect(Either.isRight(nonPositiveSets)).toBe(false)
    expect(nonPositiveSets.value.__name__).toBe(invalidSets.__name__)
    expect(nonPositiveSets.value.code).toBe(invalidSets.code)
  })

  it.concurrent('cannot be higher than 100', () => {
    const tooHighSets = WorkoutSets.fromNumber(200) as Left<InvalidWorkoutSets>
    const invalidSets = InvalidWorkoutSets.causeIsTooHigh()

    expect(Either.isRight(tooHighSets)).toBe(false)
    expect(tooHighSets.value.__name__).toBe(invalidSets.__name__)
    expect(tooHighSets.value.code).toBe(invalidSets.code)
  })
})
