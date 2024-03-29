import { Event } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'ExerciseRenamed'

type ExerciseRenamedType = NameType<
  Readonly<{
    id: string
    name: string
  }>,
  'ExerciseRenamed'
>

class ExerciseRenamed extends Event implements ExerciseRenamedType {
  readonly __name__ = __name__

  private constructor(
    readonly id: ExerciseRenamedType['id'],
    readonly name: ExerciseRenamedType['name'],
  ) {
    super()
  }

  static with({
    id,
    name,
  }: Omit<ExerciseRenamedType, '__name__'>): ExerciseRenamed {
    return new this(id, name)
  }
}

export default ExerciseRenamed
