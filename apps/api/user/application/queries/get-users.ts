import NameType from '~/shared/name-type'

const __name__ = 'GetUsers'

type GetUsersType = NameType<Readonly<Record<never, never>>, typeof __name__>

class GetUsers implements GetUsersType {
  readonly __name__ = __name__

  static all(): GetUsers {
    return new this()
  }
}

export default GetUsers
