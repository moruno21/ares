import { Event } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'RoutineRedescribed'

type RoutineRedescribedType = NameType<
  Readonly<{
    description: string
    id: string
  }>,
  'RoutineRedescribed'
>

class RoutineRedescribed extends Event implements RoutineRedescribedType {
  readonly __name__ = __name__

  private constructor(
    readonly id: RoutineRedescribedType['id'],
    readonly description: RoutineRedescribedType['description'],
  ) {
    super()
  }

  static with({
    description,
    id,
  }: Omit<RoutineRedescribedType, '__name__'>): RoutineRedescribed {
    return new this(id, description)
  }
}

export default RoutineRedescribed
