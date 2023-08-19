import { itIsNamed } from '~/test/closures/shared/name-type'

import GetUserByEmail from './get-user-by-email'

describe('GetUserByEmail', () => {
  const __name__ = 'GetUserByEmail'
  const email = 'name@gmail.com'
  const getUserByEmail = GetUserByEmail.with({ email })

  itIsNamed(getUserByEmail)

  it.concurrent('has an email', () => {
    expect(getUserByEmail).toHaveProperty('email')
  })

  it.concurrent('can be created', () => {
    expect(getUserByEmail.__name__).toBe(__name__)
    expect(getUserByEmail.email).toBe(email)
  })
})
