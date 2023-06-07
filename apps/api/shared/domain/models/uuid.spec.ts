import { v4 as uuid } from 'uuid'

import Either from '~/shared/either'

import Uuid from './uuid'

describe('Uuid', () => {
  it('can be created from string', () => {
    expect(Either.isRight(Uuid.fromString(uuid()))).toBe(true)
  })

  it('cannot have invalid format', () => {
    expect(Either.isRight(Uuid.fromString('invalid'))).toBe(false)
  })
})
