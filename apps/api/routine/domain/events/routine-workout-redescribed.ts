import { Event } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'RoutineWorkoutRedescribed'

type RoutineWorkoutRedescribedType = NameType<
  Readonly<{
    id: string
    workout: {
      exerciseDescription: string
      exerciseId: string
    }
  }>,
  'RoutineWorkoutRedescribed'
>

class RoutineWorkoutRedescribed
  extends Event
  implements RoutineWorkoutRedescribedType
{
  readonly __name__ = __name__

  private constructor(
    readonly id: RoutineWorkoutRedescribedType['id'],
    readonly workout: RoutineWorkoutRedescribedType['workout'],
  ) {
    super()
  }

  static with({
    id,
    workout,
  }: Omit<
    RoutineWorkoutRedescribedType,
    '__name__'
  >): RoutineWorkoutRedescribed {
    return new this(id, workout)
  }
}

export default RoutineWorkoutRedescribed
