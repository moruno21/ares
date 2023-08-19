import NameType from '~/shared/name-type'

const __name__ = 'GetUserById'

type GetUserByIdType = NameType<Readonly<{ id: string }>, typeof __name__>

class GetUserById implements GetUserByIdType {
  readonly __name__ = __name__

  private constructor(readonly id: GetUserByIdType['id']) {}

  static with({ id }: Omit<GetUserByIdType, '__name__'>): GetUserById {
    return new this(id)
  }
}

export default GetUserById
