import NameType from '~/shared/name-type'

const __name__ = 'EditExercise'

type EditExerciseType = NameType<
  Readonly<{
    description: string
    id: string
    name: string
  }>,
  typeof __name__
>

class EditExercise implements EditExerciseType {
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
  }: Omit<EditExerciseType, '__name__'>): EditExercise {
    return new this(id, description, name)
  }
}

export default EditExercise
