import NameType from '~/shared/name-type'

const __name__ = 'ExerciseRedescribed'

type ExerciseRedescribedType = NameType<
  Readonly<{
    description: string
    id: string
  }>,
  'ExerciseRedescribed'
>

class ExerciseRedescribed implements ExerciseRedescribedType {
  readonly __name__ = __name__

  private constructor(readonly id: string, readonly description: string) {}

  static with({
    description,
    id,
  }: Omit<ExerciseRedescribedType, '__name__'>): ExerciseRedescribed {
    return new this(id, description)
  }
}

export default ExerciseRedescribed
