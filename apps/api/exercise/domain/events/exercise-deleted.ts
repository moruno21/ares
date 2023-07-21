import { Event } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'ExerciseDeleted'

type ExerciseDeletedType = NameType<
  Readonly<{
    id: string
  }>,
  'ExerciseDeleted'
>

class ExerciseDeleted extends Event implements ExerciseDeletedType {
  readonly __name__ = __name__

  private constructor(readonly id: string) {
    super()
  }

  static with({ id }: Omit<ExerciseDeletedType, '__name__'>): ExerciseDeleted {
    return new this(id)
  }
}

export default ExerciseDeleted
