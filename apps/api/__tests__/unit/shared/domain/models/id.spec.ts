import Id from '~/shared/domain/models/id'
import Either from '~/shared/either'

describe('Id', () => {
  it.concurrent('can be created from number', () => {
    expect(Either.isRight(Id.fromValue(5))).toBe(true)
  })

  it.concurrent('can be created from string', () => {
    expect(Either.isRight(Id.fromValue('value'))).toBe(true)
  })

  it.concurrent('cannot be blank', () => {
    expect(Either.isRight(Id.fromValue(''))).toBe(false)
  })
})
