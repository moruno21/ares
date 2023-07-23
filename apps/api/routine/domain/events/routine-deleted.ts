import { Event } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'RoutineDeleted'

type RoutineDeletedType = NameType<
  Readonly<{
    id: string
  }>,
  'RoutineDeleted'
>

class RoutineDeleted extends Event implements RoutineDeletedType {
  readonly __name__ = __name__

  private constructor(readonly id: RoutineDeletedType['id']) {
    super()
  }

  static with({ id }: Omit<RoutineDeletedType, '__name__'>): RoutineDeleted {
    return new this(id)
  }
}

export default RoutineDeleted
