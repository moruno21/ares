import NameType from '~/shared/name-type'

const __name__ = 'CreateRoutine'

type CreateRoutineType = NameType<
  Readonly<{
    description: string
    id: string
    name: string
  }>,
  typeof __name__
>

class CreateRoutine implements CreateRoutineType {
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
  }: Omit<CreateRoutineType, '__name__'>): CreateRoutine {
    return new this(id, description, name)
  }
}

export default CreateRoutine
