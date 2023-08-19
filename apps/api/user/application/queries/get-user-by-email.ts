import NameType from '~/shared/name-type'

const __name__ = 'GetUserByEmail'

type GetUserByEmailType = NameType<Readonly<{ email: string }>, typeof __name__>

class GetUserByEmail implements GetUserByEmailType {
  readonly __name__ = __name__

  private constructor(readonly email: GetUserByEmailType['email']) {}

  static with({ email }: Omit<GetUserByEmailType, '__name__'>): GetUserByEmail {
    return new this(email)
  }
}

export default GetUserByEmail
