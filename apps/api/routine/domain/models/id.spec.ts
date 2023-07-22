import { InvalidUuid } from '~/shared/domain'
import Either, { Left, Right } from '~/shared/either'
import { itIsAValueObject } from '~/test/closures/shared/domain/value-object'

import RoutineId from './id'

describe('RoutineId', () => {
  const __name__ = 'RoutineId'
  const value = 'f35c1e0d-b899-400d-87ea-f8be3da60a5f'
  const id = RoutineId.fromString(value) as Right<RoutineId>

  itIsAValueObject(id.value)

  it.concurrent('can be created from an uuid string', () => {
    expect(Either.isRight(id)).toBe(true)
    expect(id.value.__name__).toBe(__name__)
    expect(id.value.value).toBe(value)
  })

  it.concurrent('cannot be blank', () => {
    const blankId = RoutineId.fromString(' ') as Left<InvalidUuid>
    const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(' ')

    expect(Either.isRight(blankId)).toBe(false)
    expect(blankId.value.__name__).toBe(invalidUuid.__name__)
    expect(blankId.value.code).toBe(invalidUuid.code)
  })

  it.concurrent('cannot be created with non uuid string', () => {
    const notUuid = RoutineId.fromString('invalid') as Left<InvalidUuid>
    const invalidUuid = InvalidUuid.causeTheFormatIsNotValid('invalid')

    expect(Either.isRight(notUuid)).toBe(false)
    expect(notUuid.value.__name__).toBe(invalidUuid.__name__)
    expect(notUuid.value.code).toBe(invalidUuid.code)
  })
})
