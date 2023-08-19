import { InvalidUuid } from '~/shared/domain'
import Either, { Left, Right } from '~/shared/either'
import { itIsAValueObject } from '~/test/closures/shared/domain/value-object'

import UserId from './id'

describe('UserId', () => {
  const __name__ = 'UserId'
  const value = 'f55eacbf-46e6-4be4-9be2-d4c36d0996ca'
  const id = UserId.fromString(value) as Right<UserId>

  itIsAValueObject(id.value)

  it.concurrent('can be created from an uuid string', () => {
    expect(Either.isRight(id)).toBe(true)
    expect(id.value.__name__).toBe(__name__)
    expect(id.value.value).toBe(value)
  })

  it.concurrent('cannot be blank', () => {
    const blankId = UserId.fromString(' ') as Left<InvalidUuid>
    const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(' ')

    expect(Either.isRight(blankId)).toBe(false)
    expect(blankId.value.__name__).toBe(invalidUuid.__name__)
    expect(blankId.value.code).toBe(invalidUuid.code)
  })

  it.concurrent('cannot be created with non uuid string', () => {
    const notUuid = UserId.fromString('invalid') as Left<InvalidUuid>
    const invalidUuid = InvalidUuid.causeTheFormatIsNotValid('invalid')

    expect(Either.isRight(notUuid)).toBe(false)
    expect(notUuid.value.__name__).toBe(invalidUuid.__name__)
    expect(notUuid.value.code).toBe(invalidUuid.code)
  })
})
