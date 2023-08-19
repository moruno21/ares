import { itIsNamed } from '~/test/closures/shared/name-type'

import GetUser from './get-user'

describe('GetUser', () => {
  const __name__ = 'GetUser'
  const id = 'id'
  const getUser = GetUser.with({ id })

  itIsNamed(getUser)

  it.concurrent('has an id', () => {
    expect(getUser).toHaveProperty('id')
  })

  it.concurrent('can be created', () => {
    expect(getUser.__name__).toBe(__name__)
    expect(getUser.id).toBe(id)
  })
})
