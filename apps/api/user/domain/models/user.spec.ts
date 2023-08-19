import { itIsAnEntity } from '~/test/closures/shared/domain/entity'

import UserEmail from './email'
import UserId from './id'
import UserName from './name'
import User from './user'

describe('User', () => {
  const __name__ = 'User'
  const id = UserId.fromString('7fac4396-a163-4b04-b5ca-fe7cbeaa3b11')
    .value as UserId
  const name = UserName.fromString('name')
  const email = UserEmail.fromString('email')
  const user = User.create({ email, id, name })

  itIsAnEntity(user)

  it.concurrent('has an email', () => {
    expect(user).toHaveProperty('email')
  })

  it.concurrent('has a name', () => {
    expect(user).toHaveProperty('name')
  })

  it.concurrent('can be created', () => {
    expect(user.__name__).toBe(__name__)
    expect(user.id).toStrictEqual(id)
    expect(user.email).toStrictEqual(email)
    expect(user.name).toStrictEqual(name)
  })
})
