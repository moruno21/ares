import { InvalidUuid } from '~/shared/domain'
import Either, { Left, Right } from '~/shared/either'
import { itIsAValueObject } from '~/test/shared/closures/domain/value-object'

import ExerciseId from './id'

describe('ExerciseId', () => {
  const __name__ = 'ExerciseId'
  const value = '9ab5b939-0669-4524-99c6-633811fcee27'
  const id = ExerciseId.fromString(value) as Right<ExerciseId>

  itIsAValueObject(id.value)

  it.concurrent('can be created from an uuid string', () => {
    expect(Either.isRight(id)).toBe(true)
    expect(id.value.__name__).toBe(__name__)
    expect(id.value.value).toBe(value)
  })

  it.concurrent('cannot be blank', () => {
    const blankId = ExerciseId.fromString(' ') as Left<InvalidUuid>
    const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(' ')

    expect(Either.isRight(blankId)).toBe(false)
    expect(blankId.value.__name__).toBe(invalidUuid.__name__)
    expect(blankId.value.code).toBe(invalidUuid.code)
  })

  it.concurrent('cannot be created with non uuid string', () => {
    const notUuid = ExerciseId.fromString('invalid') as Left<InvalidUuid>
    const invalidUuid = InvalidUuid.causeTheFormatIsNotValid('invalid')

    expect(Either.isRight(notUuid)).toBe(false)
    expect(notUuid.value.__name__).toBe(invalidUuid.__name__)
    expect(notUuid.value.code).toBe(invalidUuid.code)
  })
})
