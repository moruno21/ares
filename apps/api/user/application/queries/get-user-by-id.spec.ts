import { itIsNamed } from '~/test/closures/shared/name-type'

import GetUserById from './get-user-by-id'

describe('GetUserById', () => {
  const __name__ = 'GetUserById'
  const id = 'id'
  const getUserById = GetUserById.with({ id })

  itIsNamed(getUserById)

  it.concurrent('has an id', () => {
    expect(getUserById).toHaveProperty('id')
  })

  it.concurrent('can be created', () => {
    expect(getUserById.__name__).toBe(__name__)
    expect(getUserById.id).toBe(id)
  })
})
