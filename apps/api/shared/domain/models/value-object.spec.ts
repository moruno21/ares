import { itIsAValueObject } from '~/test/closures/shared/domain/value-object'

import ValueObject from './value-object'

describe('ValueObject', () => {
  const __name__ = 'ValueObject'
  const value = 'value'
  const valueObject = ValueObject.with({ __name__, value })

  itIsAValueObject(valueObject)

  it.concurrent('can be created', () => {
    expect(valueObject.__name__).toBe(__name__)
    expect(valueObject.value).toBe(value)
  })

  it.concurrent(
    'checks that different value objects with different values are not equal',
    () => {
      expect(
        ValueObject.equals(
          { __name__: 'ValueObject', value: 'value' },
          { __name__: 'DifferentValueObject', value: 'different' },
        ),
      ).toBe(false)
    },
  )

  it.concurrent(
    'checks that different value objects with same values are not equal',
    () => {
      expect(
        ValueObject.equals(
          { __name__: 'ValueObject', value: 'value' },
          { __name__: 'DifferentValueObject', value: 'value' },
        ),
      ).toBe(false)
    },
  )

  it.concurrent(
    'checks that same value objects with different values are not equal',
    () => {
      expect(
        ValueObject.equals(
          { __name__: 'ValueObject', value: 'value' },
          { __name__: 'ValueObject', value: 'different' },
        ),
      ).toBe(false)
    },
  )

  it.concurrent(
    'checks that same value objects with same values are equal',
    () => {
      expect(
        ValueObject.equals(
          { __name__: 'ValueObject', value: 'value' },
          { __name__: 'ValueObject', value: 'value' },
        ),
      ).toBe(true)
    },
  )
})
