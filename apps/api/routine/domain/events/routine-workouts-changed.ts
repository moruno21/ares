import { Event } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'RoutineWorkoutsChanged'

type RoutineWorkoutsChangedType = NameType<
  Readonly<{
    id: string
    workouts: {
      exerciseId: string
      reps: number
      sets: number
    }[]
  }>,
  'RoutineWorkoutsChanged'
>

class RoutineWorkoutsChanged
  extends Event
  implements RoutineWorkoutsChangedType
{
  readonly __name__ = __name__

  private constructor(
    readonly id: RoutineWorkoutsChangedType['id'],
    readonly workouts: RoutineWorkoutsChangedType['workouts'],
  ) {
    super()
  }

  static with({
    id,
    workouts,
  }: Omit<RoutineWorkoutsChangedType, '__name__'>): RoutineWorkoutsChanged {
    return new this(id, workouts)
  }
}

export default RoutineWorkoutsChanged
