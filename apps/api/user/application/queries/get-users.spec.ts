import { itIsNamed } from '~/test/closures/shared/name-type'

import GetUsers from './get-users'

describe('GetUsers', () => {
  const __name__ = 'GetUsers'
  const getUsers = GetUsers.all()

  itIsNamed(getUsers)

  it.concurrent('can be created', () => {
    expect(getUsers.__name__).toBe(__name__)
  })
})
