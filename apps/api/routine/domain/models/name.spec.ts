import Either, { Left, Right } from '~/shared/either'
import { itIsAValueObject } from '~/test/closures/shared/domain/value-object'

import InvalidRoutineName from '../exceptions/invalid-name'
import RoutineName from './name'

describe('RoutineName', () => {
  const __name__ = 'RoutineName'
  const value = 'value'
  const name = RoutineName.fromString(value) as Right<RoutineName>

  itIsAValueObject(name.value)

  it.concurrent('can be created from string', () => {
    expect(Either.isRight(name)).toBe(true)
    expect(name.value.__name__).toBe(__name__)
    expect(name.value.value).toBe(value)
  })

  it.concurrent('cannot be blank', () => {
    const blankName = RoutineName.fromString(' ') as Left<InvalidRoutineName>
    const invalidName = InvalidRoutineName.causeIsBlank()

    expect(Either.isRight(blankName)).toBe(false)
    expect(blankName.value.__name__).toBe(invalidName.__name__)
    expect(blankName.value.code).toBe(invalidName.code)
  })

  it.concurrent('cannot be longer than 50 characters', () => {
    const tooLongName = RoutineName.fromString(
      'hey! this is a name that has more than fifty characters',
    ) as Left<InvalidRoutineName>
    const invalidName = InvalidRoutineName.causeIsTooLong()

    expect(Either.isRight(tooLongName)).toBe(false)
    expect(tooLongName.value.__name__).toBe(invalidName.__name__)
    expect(tooLongName.value.code).toBe(invalidName.code)
  })
})
