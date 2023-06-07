import ValueObject from './value-object'

describe('ValueObject', () => {
  it('checks that different value objects with different values are not equal', () => {
    expect(
      ValueObject.equals(
        { __name__: 'ValueObject', value: 'value' },
        { __name__: 'DifferentValueObject', value: 'different' },
      ),
    ).toBe(false)
  })

  it('checks that different value objects with same values are not equal', () => {
    expect(
      ValueObject.equals(
        { __name__: 'ValueObject', value: 'value' },
        { __name__: 'DifferentValueObject', value: 'value' },
      ),
    ).toBe(false)
  })

  it('checks that same value objects with different values are not equal', () => {
    expect(
      ValueObject.equals(
        { __name__: 'ValueObject', value: 'value' },
        { __name__: 'ValueObject', value: 'different' },
      ),
    ).toBe(false)
  })

  it('checks that same value objects with same values are equal', () => {
    expect(
      ValueObject.equals(
        { __name__: 'ValueObject', value: 'value' },
        { __name__: 'ValueObject', value: 'value' },
      ),
    ).toBe(true)
  })
})
