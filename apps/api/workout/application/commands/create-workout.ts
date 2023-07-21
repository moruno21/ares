import NameType from '~/shared/name-type'

const __name__ = 'CreateWorkout'

type CreateWorkoutType = NameType<
  Readonly<{
    exerciseId: string
    id: string
    reps: number
    sets: number
  }>,
  typeof __name__
>

class CreateWorkout implements CreateWorkoutType {
  readonly __name__ = __name__

  private constructor(
    readonly id: string,
    readonly exerciseId: string,
    readonly reps: number,
    readonly sets: number,
  ) {}

  static with({
    exerciseId,
    id,
    reps,
    sets,
  }: Omit<CreateWorkoutType, '__name__'>): CreateWorkout {
    return new this(id, exerciseId, reps, sets)
  }
}

export default CreateWorkout
