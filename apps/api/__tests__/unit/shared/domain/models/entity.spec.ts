import Entity from '~/shared/domain/models/entity'
import ValueObject from '~/shared/domain/models/value-object'

describe('Entity', () => {
  it.concurrent('checks that it is created correctly', () => {
    const idName = 'name'
    const idValue = 'value'
    const id = ValueObject.with({
      __name__: idName,
      value: idValue,
    })
    const __name__ = 'Entity'
    const entity = Entity.with({ __name__, id })

    expect(entity.__name__ === __name__).toBe(true)
    expect(entity.id === id).toBe(true)
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
