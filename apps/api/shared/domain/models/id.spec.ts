import Either from '~/shared/either'

import Id from './id'

describe('Id', () => {
  it('can be created from number', () => {
    expect(Either.isRight(Id.fromValue(0))).toBe(true)
  })

  it('can be created from string', () => {
    expect(Either.isRight(Id.fromValue('value'))).toBe(true)
  })

  it('cannot be blank', () => {
    expect(Either.isRight(Id.fromValue(''))).toBe(false)
  })
})
