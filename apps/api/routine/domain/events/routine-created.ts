import { Event } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'RoutineCreated'

type RoutineCreatedType = NameType<
  Readonly<{
    description: string
    id: string
    name: string
  }>,
  'RoutineCreated'
>

class RoutineCreated extends Event implements RoutineCreatedType {
  readonly __name__ = __name__

  private constructor(
    readonly id: string,
    readonly description: string,
    readonly name: string,
  ) {
    super()
  }

  static with({
    description,
    id,
    name,
  }: Omit<RoutineCreatedType, '__name__'>): RoutineCreated {
    return new this(id, description, name)
  }
}

export default RoutineCreated
