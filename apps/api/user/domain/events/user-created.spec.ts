import { itIsNamed } from '~/test/closures/shared/name-type'

import UserCreated from './user-created'

describe('UserCreated', () => {
  const __name__ = 'UserCreated'
  const id = 'id'
  const email = 'name@gmail.com'
  const name = 'name'
  const userCreated = UserCreated.with({
    email,
    id,
    name,
  })

  itIsNamed(userCreated)

  it.concurrent('has an id', () => {
    expect(userCreated).toHaveProperty('id')
  })

  it.concurrent('has an email', () => {
    expect(userCreated).toHaveProperty('email')
  })

  it.concurrent('has an name', () => {
    expect(userCreated).toHaveProperty('name')
  })

  it.concurrent('can be created', () => {
    expect(userCreated.__name__).toBe(__name__)
    expect(userCreated.id).toBe(id)
    expect(userCreated.email).toBe(email)
    expect(userCreated.name).toBe(name)
  })
})
