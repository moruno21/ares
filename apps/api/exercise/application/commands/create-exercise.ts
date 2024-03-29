import NameType from '~/shared/name-type'

const __name__ = 'CreateExercise'

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
    readonly id: CreateExerciseType['id'],
    readonly description: CreateExerciseType['description'],
    readonly name: CreateExerciseType['name'],
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
