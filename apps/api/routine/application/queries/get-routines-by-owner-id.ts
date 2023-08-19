import NameType from '~/shared/name-type'

const __name__ = 'GetRoutinesByOwnerId'

type GetRoutinesByOwnerIdType = NameType<
  Readonly<{ ownerId: string }>,
  typeof __name__
>

class GetRoutinesByOwnerId implements GetRoutinesByOwnerIdType {
  readonly __name__ = __name__

  private constructor(readonly ownerId: GetRoutinesByOwnerIdType['ownerId']) {}

  static with({
    ownerId,
  }: Omit<GetRoutinesByOwnerIdType, '__name__'>): GetRoutinesByOwnerId {
    return new this(ownerId)
  }
}

export default GetRoutinesByOwnerId
