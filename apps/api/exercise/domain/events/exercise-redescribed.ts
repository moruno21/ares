import { Event } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'ExerciseRedescribed'

type ExerciseRedescribedType = NameType<
  Readonly<{
    description: string
    id: string
  }>,
  'ExerciseRedescribed'
>

class ExerciseRedescribed extends Event implements ExerciseRedescribedType {
  readonly __name__ = __name__

  private constructor(readonly id: string, readonly description: string) {
    super()
  }

  static with({
    description,
    id,
  }: Omit<ExerciseRedescribedType, '__name__'>): ExerciseRedescribed {
    return new this(id, description)
  }
}

export default ExerciseRedescribed
