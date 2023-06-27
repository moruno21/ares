import Either, { Left, Right } from '~/shared/either'
import { itIsAValueObject } from '~/test/shared/closures/domain/value-object'

import InvalidExerciseName from '../exceptions/invalid-name'
import ExerciseName from './name'

describe('ExerciseName', () => {
  const __name__ = 'ExerciseName'
  const value = 'value'
  const name = ExerciseName.fromString(value) as Right<ExerciseName>

  itIsAValueObject(name.value)

  it.concurrent('can be created from string', () => {
    expect(Either.isRight(name)).toBe(true)
    expect(name.value.__name__).toBe(__name__)
    expect(name.value.value).toBe(value)
  })

  it.concurrent('cannot be blank', () => {
    const blankName = ExerciseName.fromString(' ') as Left<InvalidExerciseName>
    const invalidName = InvalidExerciseName.causeIsBlank()

    expect(Either.isRight(blankName)).toBe(false)
    expect(blankName.value.__name__).toBe(invalidName.__name__)
    expect(blankName.value.code).toBe(invalidName.code)
  })

  it.concurrent('cannot be longer than 50 characters', () => {
    const tooLongName = ExerciseName.fromString(
      'hey! this is a name that has more than fifty characters',
    ) as Left<InvalidExerciseName>
    const invalidName = InvalidExerciseName.causeIsTooLong()

    expect(Either.isRight(tooLongName)).toBe(false)
    expect(tooLongName.value.__name__).toBe(invalidName.__name__)
    expect(tooLongName.value.code).toBe(invalidName.code)
  })
})
