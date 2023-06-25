import ValueObject from '~/shared/domain/models/value-object'

describe('ValueObject', () => {
  it.concurrent('checks that it is created correctly', () => {
    const value = 'value'
    const __name__ = 'name'
    const valueObject = ValueObject.with({ __name__, value })

    expect(valueObject.__name__ === __name__).toBe(true)
    expect(valueObject.value === value).toBe(true)
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
