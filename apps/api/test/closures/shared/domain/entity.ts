import Entity from '~/shared/domain/models/entity'
import ValueObject from '~/shared/domain/models/value-object'

import { expectIsNamed } from '../name-type'

export const itIsAnEntity = (
  value: Entity<string, ValueObject<string, number | string>>,
) => {
  it.concurrent('is an entity', () => {
    expectIsNamed(value)
    expect(value).toHaveProperty('id')
  })
}
