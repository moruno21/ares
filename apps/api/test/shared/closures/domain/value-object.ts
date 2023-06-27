import ValueObject from '~/shared/domain/models/value-object'

import { expectIsNamed } from '../name-type'

export const itIsAValueObject = (value: ValueObject) => {
  it.concurrent('is a value object', () => {
    expectIsNamed(value)
    expect(value).toHaveProperty('value')
  })
}
