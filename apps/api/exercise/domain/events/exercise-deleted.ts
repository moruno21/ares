import NameType from '~/shared/name-type'

const __name__ = 'ExerciseDeleted'

type ExerciseDeletedType = NameType<
  Readonly<{
    id: string
  }>,
  'ExerciseDeleted'
>

class ExerciseDeleted implements ExerciseDeletedType {
  readonly __name__ = __name__

  private constructor(readonly id: string) {}

  static with({ id }: Omit<ExerciseDeletedType, '__name__'>): ExerciseDeleted {
    return new this(id)
  }
}

export default ExerciseDeleted
