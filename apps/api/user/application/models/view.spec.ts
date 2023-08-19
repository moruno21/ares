import { itIsNamed } from '~/test/closures/shared/name-type'

import UserView from './view'

describe('UserView', () => {
  const __name__ = 'UserView'
  const id = 'id'
  const email = 'email'
  const name = 'name'
  const view = UserView.with({ email, id, name })

  itIsNamed(view)

  it.concurrent('has an id', () => {
    expect(view).toHaveProperty('id')
  })

  it.concurrent('has an email', () => {
    expect(view).toHaveProperty('email')
  })

  it.concurrent('has a name', () => {
    expect(view).toHaveProperty('name')
  })

  it.concurrent('can be created', () => {
    expect(view.__name__).toBe(__name__)
    expect(view.id).toBe(id)
    expect(view.email).toBe(email)
    expect(view.name).toBe(name)
  })
})
