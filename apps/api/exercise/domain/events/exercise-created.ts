import NameType from '~/shared/name-type'

class ExerciseCreated
  implements
    NameType<
      Readonly<{
        description: string
        id: string
        name: string
      }>,
      'ExerciseCreated'
    >
{
  readonly __name__ = 'ExerciseCreated'

  private constructor(
    readonly id: string,
    readonly description: string,
    readonly name: string,
  ) {}

  static with({
    description,
    id,
    name,
  }: Omit<ExerciseCreated, '__name__'>): ExerciseCreated {
    return new this(id, description, name)
  }
}

export default ExerciseCreated
