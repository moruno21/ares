import NameType from '~/shared/name-type'

const __name__ = 'EditRoutine'

type EditRoutineType = NameType<
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

class EditRoutine implements EditRoutineType {
  readonly __name__ = __name__

  private constructor(
    readonly id: EditRoutineType['id'],
    readonly description: EditRoutineType['description'],
    readonly name: EditRoutineType['name'],
    readonly workouts: EditRoutineType['workouts'],
  ) {}

  static with({
    description,
    id,
    name,
    workouts,
  }: Omit<EditRoutineType, '__name__'>): EditRoutine {
    return new this(id, description, name, workouts)
  }
}

export default EditRoutine
