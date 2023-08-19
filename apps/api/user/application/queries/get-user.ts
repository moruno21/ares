import NameType from '~/shared/name-type'

const __name__ = 'GetUser'

type GetUserType = NameType<Readonly<{ id: string }>, typeof __name__>

class GetUser implements GetUserType {
  readonly __name__ = __name__

  private constructor(readonly id: GetUserType['id']) {}

  static with({ id }: Omit<GetUserType, '__name__'>): GetUser {
    return new this(id)
  }
}

export default GetUser
