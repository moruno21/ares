import Either, { Right } from '~/shared/either'

import Uuid from './uuid'

describe('Uuid', () => {
  it.concurrent('can be created from string', () => {
    const value = '85fe13bf-5e0f-47e4-be24-21b94e9048e1'
    const uuid = Uuid.fromString(value) as Right<Uuid>

    expect(Either.isRight(uuid)).toBe(true)
    expect(uuid.value.__name__).toBe('Uuid')
    expect(uuid.value.value).toBe(value)
  })

  it.concurrent('cannot have invalid format', () => {
    expect(Either.isRight(Uuid.fromString('invalid'))).toBe(false)
  })
})
