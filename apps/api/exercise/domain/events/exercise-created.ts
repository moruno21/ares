import { Event } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'ExerciseCreated'

type ExerciseCreatedType = NameType<
  Readonly<{
    description: string
    id: string
    name: string
  }>,
  'ExerciseCreated'
>

class ExerciseCreated extends Event implements ExerciseCreatedType {
  readonly __name__ = __name__

  private constructor(
    readonly id: ExerciseCreatedType['id'],
    readonly description: ExerciseCreatedType['description'],
    readonly name: ExerciseCreatedType['name'],
  ) {
    super()
  }

  static with({
    description,
    id,
    name,
  }: Omit<ExerciseCreatedType, '__name__'>): ExerciseCreated {
    return new this(id, description, name)
  }
}

export default ExerciseCreated
