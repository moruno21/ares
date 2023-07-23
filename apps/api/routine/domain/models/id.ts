import { InvalidUuid, Uuid } from '~/shared/domain'
import Either from '~/shared/either'
import NameType from '~/shared/name-type'

const __name__ = 'RoutineId'

type RoutineId = NameType<Uuid, typeof __name__>

const RoutineId = {
  fromString: (value: RoutineId['value']): Either<InvalidUuid, RoutineId> => {
    const uuid = Uuid.fromString(value)
    const isInvalidUuid = Either.isLeft(uuid)

    if (isInvalidUuid) return uuid

    return Either.right({ __name__, value })
  },
} as const

export default RoutineId
