import Entity from './entity'

describe('Entity', () => {
  it('checks that different entities with different ids are not equal', () => {
    expect(
      Entity.same(
        { __name__: 'Entity', id: { __name__: 'Id', value: 'value' } },
        {
          __name__: 'DifferentEntity',
          id: { __name__: 'Id', value: 'different' },
        },
      ),
    ).toBe(false)
  })

  it('checks that different entities with same ids are not equal', () => {
    expect(
      Entity.same(
        { __name__: 'Entity', id: { __name__: 'Id', value: 'value' } },
        { __name__: 'DifferentEntity', id: { __name__: 'Id', value: 'value' } },
      ),
    ).toBe(false)
  })

  it('checks that same entities with different ids are not equal', () => {
    expect(
      Entity.same(
        { __name__: 'Entity', id: { __name__: 'Id', value: 'value' } },
        { __name__: 'Entity', id: { __name__: 'Id', value: 'different' } },
      ),
    ).toBe(false)
  })

  it('checks that same entities with same ids are equal', () => {
    expect(
      Entity.same(
        { __name__: 'Entity', id: { __name__: 'Id', value: 'value' } },
        { __name__: 'Entity', id: { __name__: 'Id', value: 'value' } },
      ),
    ).toBe(true)
  })
})
