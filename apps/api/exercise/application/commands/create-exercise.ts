import NameType from '~/shared/name-type'

const __name__ = 'ExerciseCreated'

type CreateExerciseType = NameType<
  Readonly<{
    description: string
    id: string
    name: string
  }>,
  typeof __name__
>

class CreateExercise implements CreateExerciseType {
  readonly __name__ = __name__

  private constructor(
    readonly id: string,
    readonly description: string,
    readonly name: string,
  ) {}

  static with({
    description,
    id,
    name,
  }: Omit<CreateExerciseType, '__name__'>): CreateExercise {
    return new this(id, description, name)
  }
}

export default CreateExercise
