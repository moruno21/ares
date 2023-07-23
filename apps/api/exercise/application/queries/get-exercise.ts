import NameType from '~/shared/name-type'

const __name__ = 'GetExercise'

type GetExerciseType = NameType<Readonly<{ id: string }>, typeof __name__>

class GetExercise implements GetExerciseType {
  readonly __name__ = __name__

  private constructor(readonly id: GetExerciseType['id']) {}

  static with({ id }: Omit<GetExerciseType, '__name__'>): GetExercise {
    return new this(id)
  }
}

export default GetExercise
