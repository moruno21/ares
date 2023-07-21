import { InvalidUuid } from '~/shared/domain'
import Either, { Left, Right } from '~/shared/either'
import { itIsAValueObject } from '~/test/closures/shared/domain/value-object'

import WorkoutId from './id'

describe('WorkoutId', () => {
  const __name__ = 'WorkoutId'
  const value = 'e4009ae0-567f-47c0-88f2-909ab03db342'
  const id = WorkoutId.fromString(value) as Right<WorkoutId>

  itIsAValueObject(id.value)

  it.concurrent('can be created from an uuid string', () => {
    expect(Either.isRight(id)).toBe(true)
    expect(id.value.__name__).toBe(__name__)
    expect(id.value.value).toBe(value)
  })

  it.concurrent('cannot be blank', () => {
    const blankId = WorkoutId.fromString(' ') as Left<InvalidUuid>
    const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(' ')

    expect(Either.isRight(blankId)).toBe(false)
    expect(blankId.value.__name__).toBe(invalidUuid.__name__)
    expect(blankId.value.code).toBe(invalidUuid.code)
  })

  it.concurrent('cannot be created with non uuid string', () => {
    const notUuid = WorkoutId.fromString('invalid') as Left<InvalidUuid>
    const invalidUuid = InvalidUuid.causeTheFormatIsNotValid('invalid')

    expect(Either.isRight(notUuid)).toBe(false)
    expect(notUuid.value.__name__).toBe(invalidUuid.__name__)
    expect(notUuid.value.code).toBe(invalidUuid.code)
  })
})
