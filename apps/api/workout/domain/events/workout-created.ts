import { Event } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'WorkoutCreated'

type WorkoutCreatedType = NameType<
  Readonly<{
    exerciseId: string
    id: string
    reps: number
    sets: number
  }>,
  'WorkoutCreated'
>

class WorkoutCreated extends Event implements WorkoutCreatedType {
  readonly __name__ = __name__

  private constructor(
    readonly id: string,
    readonly exerciseId: string,
    readonly reps: number,
    readonly sets: number,
  ) {
    super()
  }

  static with({
    exerciseId,
    id,
    reps,
    sets,
  }: Omit<WorkoutCreatedType, '__name__'>): WorkoutCreated {
    return new this(id, exerciseId, reps, sets)
  }
}

export default WorkoutCreated
