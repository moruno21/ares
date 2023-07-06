import NameType from '~/shared/name-type'

const __name__ = 'DeleteExercise'

type DeleteExerciseType = NameType<
  Readonly<{
    id: string
  }>,
  typeof __name__
>

class DeleteExercise implements DeleteExerciseType {
  readonly __name__ = __name__

  private constructor(readonly id: string) {}

  static with({ id }: Omit<DeleteExerciseType, '__name__'>): DeleteExercise {
    return new this(id)
  }
}

export default DeleteExercise
