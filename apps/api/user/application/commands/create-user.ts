import NameType from '~/shared/name-type'

const __name__ = 'CreateUser'

type CreateUserType = NameType<
  Readonly<{
    email: string
    id: string
  }>,
  typeof __name__
>

class CreateUser implements CreateUserType {
  readonly __name__ = __name__

  private constructor(
    readonly id: CreateUserType['id'],
    readonly email: CreateUserType['email'],
  ) {}

  static with({ email, id }: Omit<CreateUserType, '__name__'>): CreateUser {
    return new this(id, email)
  }
}

export default CreateUser
