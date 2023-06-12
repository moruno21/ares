import { InvalidUuid, Uuid } from '~/shared/domain'
import Either from '~/shared/either'
import NamedType from '~/shared/named-type'

const __name__ = 'ExerciseId'

type ExerciseId = NamedType<Uuid, typeof __name__>

const ExerciseId = {
  fromString: (value: string): Either<InvalidUuid, ExerciseId> => {
    const uuid = Uuid.fromString(value)
    const isInvalidUuid = Either.isLeft(uuid)

    if (isInvalidUuid) return uuid

    return Either.right({ __name__, value })
  },
} as const

export default ExerciseId
