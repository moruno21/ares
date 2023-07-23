import { Event } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'RoutineCreated'

type RoutineCreatedType = NameType<
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
  'RoutineCreated'
>

class RoutineCreated extends Event implements RoutineCreatedType {
  readonly __name__ = __name__

  private constructor(
    readonly id: RoutineCreatedType['id'],
    readonly description: RoutineCreatedType['description'],
    readonly name: RoutineCreatedType['name'],
    readonly workouts: RoutineCreatedType['workouts'],
  ) {
    super()
  }

  static with({
    description,
    id,
    name,
    workouts,
  }: Omit<RoutineCreatedType, '__name__'>): RoutineCreated {
    return new this(id, description, name, workouts)
  }
}

export default RoutineCreated
