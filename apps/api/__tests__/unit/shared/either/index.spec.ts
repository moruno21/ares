import Either from '~/shared/either'

describe('Either', () => {
  it('checks that a right value is right', () => {
    expect(Either.isRight(Either.right('right'))).toBe(true)
  })
  it('checks that a left value is left', () => {
    expect(Either.isLeft(Either.left('left'))).toBe(true)
  })
  it('checks that a left value is not right', () => {
    expect(Either.isRight(Either.left('left'))).toBe(false)
  })
  it('checks that a right value is not left', () => {
    expect(Either.isLeft(Either.right('right'))).toBe(false)
  })
})
