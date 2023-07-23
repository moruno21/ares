import NameType from '~/shared/name-type'

const __name__ = 'CreateRoutine'

type CreateRoutineType = NameType<
  Readonly<{
    description: string
    id: string
    name: string
    workouts: {
      exerciseId: string
      reps: number
      sets: number
    }[]
  }>,
  typeof __name__
>

class CreateRoutine implements CreateRoutineType {
  readonly __name__ = __name__

  private constructor(
    readonly id: CreateRoutineType['id'],
    readonly description: CreateRoutineType['description'],
    readonly name: CreateRoutineType['name'],
    readonly workouts: CreateRoutineType['workouts'],
  ) {}

  static with({
    description,
    id,
    name,
    workouts,
  }: Omit<CreateRoutineType, '__name__'>): CreateRoutine {
    return new this(id, description, name, workouts)
  }
}

export default CreateRoutine
