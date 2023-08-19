import { AggregateRoot } from '~/shared/domain'

import UserCreated from '../events/user-created'
import UserEmail from './email'
import UserId from './id'
import UserName from './name'

const __name__ = 'User'

class User extends AggregateRoot<typeof __name__, UserId> {
  readonly __name__ = __name__

  private _email: UserEmail
  private _name: UserName

  get name(): UserName {
    return this._name
  }

  get email(): UserEmail {
    return this._email
  }

  static create({
    email,
    id,
    name,
  }: {
    email: UserEmail
    id: UserId
    name: UserName
  }): User {
    const user = new this()

    user.apply(
      UserCreated.with({
        email: email.value,
        id: id.value,
        name: name.value,
      }),
    )

    return user
  }

  private onUserCreated(event: UserCreated) {
    this._id = UserId.fromString(event.id).value as UserId
    this._email = UserEmail.fromString(event.email) as UserEmail
    this._name = UserName.fromString(event.name) as UserName
  }
}

export default User
