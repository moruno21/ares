import { Event } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'RoutineWorkoutRenamed'

type RoutineWorkoutRenamedType = NameType<
  Readonly<{
    id: string
    workout: {
      exerciseId: string
      exerciseName: string
    }
  }>,
  'RoutineWorkoutRenamed'
>

class RoutineWorkoutRenamed extends Event implements RoutineWorkoutRenamedType {
  readonly __name__ = __name__

  private constructor(
    readonly id: RoutineWorkoutRenamedType['id'],
    readonly workout: RoutineWorkoutRenamedType['workout'],
  ) {
    super()
  }

  static with({
    id,
    workout,
  }: Omit<RoutineWorkoutRenamedType, '__name__'>): RoutineWorkoutRenamed {
    return new this(id, workout)
  }
}

export default RoutineWorkoutRenamed
