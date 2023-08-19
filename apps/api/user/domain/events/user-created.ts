import { Event } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'UserCreated'

type UserCreatedType = NameType<
  Readonly<{
    email: string
    id: string
    name: string
  }>,
  'UserCreated'
>

class UserCreated extends Event implements UserCreatedType {
  readonly __name__ = __name__

  private constructor(
    readonly id: UserCreatedType['id'],
    readonly email: UserCreatedType['email'],
    readonly name: UserCreatedType['name'],
  ) {
    super()
  }

  static with({
    email,
    id,
    name,
  }: Omit<UserCreatedType, '__name__'>): UserCreated {
    return new this(id, email, name)
  }
}

export default UserCreated
