import NamedType from '~/shared/named-type'

class ExerciseCreated
  implements
    NamedType<
      Readonly<{
        id: string
        name: string
      }>,
      'ExerciseCreated'
    >
{
  readonly __name__ = 'ExerciseCreated'

  private constructor(readonly id: string, readonly name: string) {}

  static with({
    id,
    name,
  }: Omit<ExerciseCreated, '__name__'>): ExerciseCreated {
    return new this(id, name)
  }
}

export default ExerciseCreated
