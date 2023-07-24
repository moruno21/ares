import { Event } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'RoutineRenamed'

type RoutineRenamedType = NameType<
  Readonly<{
    id: string
    name: string
  }>,
  'RoutineRenamed'
>

class RoutineRenamed extends Event implements RoutineRenamedType {
  readonly __name__ = __name__

  private constructor(
    readonly id: RoutineRenamedType['id'],
    readonly name: RoutineRenamedType['name'],
  ) {
    super()
  }

  static with({
    id,
    name,
  }: Omit<RoutineRenamedType, '__name__'>): RoutineRenamed {
    return new this(id, name)
  }
}

export default RoutineRenamed
