import { itIsNamed } from '~/test/closures/shared/name-type'

import CreateUser from './create-user'

describe('CreateUser', () => {
  const __name__ = 'CreateUser'
  const id = 'id'
  const email = 'email'
  const createUser = CreateUser.with({ email, id })

  itIsNamed(createUser)

  it.concurrent('has an id', () => {
    expect(createUser).toHaveProperty('id')
  })

  it.concurrent('has an email', () => {
    expect(createUser).toHaveProperty('email')
  })

  it.concurrent('can be created', () => {
    expect(createUser.__name__).toBe(__name__)
    expect(createUser.id).toBe(id)
    expect(createUser.email).toBe(email)
  })
})
