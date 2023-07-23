import NameType from '~/shared/name-type'

const __name__ = 'GetRoutine'

type GetRoutineType = NameType<Readonly<{ id: string }>, typeof __name__>

class GetRoutine implements GetRoutineType {
  readonly __name__ = __name__

  private constructor(readonly id: GetRoutineType['id']) {}

  static with({ id }: Omit<GetRoutineType, '__name__'>): GetRoutine {
    return new this(id)
  }
}

export default GetRoutine
