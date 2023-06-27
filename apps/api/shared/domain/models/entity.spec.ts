import { itIsAnEntity } from '~/test/closures/shared/domain/entity'

import Entity from './entity'
import ValueObject from './value-object'

describe('Entity', () => {
  const __name__ = 'Entity'
  const id = ValueObject.with({
    __name__: 'name',
    value: 'value',
  })
  const entity = Entity.with({ __name__, id })

  itIsAnEntity(entity)

  it.concurrent('can be created', () => {
    expect(entity.__name__).toBe(__name__)
    expect(entity.id).toBe(id)
  })

  it.concurrent(
    'checks that different entities with different ids are not equal',
    () => {
      expect(
        Entity.same(
          { __name__: 'Entity', id: { __name__: 'Id', value: 'value' } },
          {
            __name__: 'DifferentEntity',
            id: { __name__: 'Id', value: 'different' },
          },
        ),
      ).toBe(false)
    },
  )

  it.concurrent(
    'checks that different entities with same ids are not equal',
    () => {
      expect(
        Entity.same(
          { __name__: 'Entity', id: { __name__: 'Id', value: 'value' } },
          {
            __name__: 'DifferentEntity',
            id: { __name__: 'Id', value: 'value' },
          },
        ),
      ).toBe(false)
    },
  )

  it.concurrent(
    'checks that same entities with different ids are not equal',
    () => {
      expect(
        Entity.same(
          { __name__: 'Entity', id: { __name__: 'Id', value: 'value' } },
          { __name__: 'Entity', id: { __name__: 'Id', value: 'different' } },
        ),
      ).toBe(false)
    },
  )

  it.concurrent('checks that same entities with same ids are equal', () => {
    expect(
      Entity.same(
        { __name__: 'Entity', id: { __name__: 'Id', value: 'value' } },
        { __name__: 'Entity', id: { __name__: 'Id', value: 'value' } },
      ),
    ).toBe(true)
  })
})
