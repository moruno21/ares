import { Event } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'RoutineWorkoutDeleted'

type RoutineWorkoutDeletedType = NameType<
  Readonly<{
    id: string
    workout: { exerciseId: string }
  }>,
  'RoutineWorkoutDeleted'
>

class RoutineWorkoutDeleted extends Event implements RoutineWorkoutDeletedType {
  readonly __name__ = __name__

  private constructor(
    readonly id: RoutineWorkoutDeletedType['id'],
    readonly workout: RoutineWorkoutDeletedType['workout'],
  ) {
    super()
  }

  static with({
    id,
    workout,
  }: Omit<RoutineWorkoutDeletedType, '__name__'>): RoutineWorkoutDeleted {
    return new this(id, workout)
  }
}

export default RoutineWorkoutDeleted
