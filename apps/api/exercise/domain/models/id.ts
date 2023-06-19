import { InvalidUuid, Uuid } from '~/shared/domain'
import Either from '~/shared/either'
import NameType from '~/shared/name-type'

const __name__ = 'ExerciseId'

type ExerciseId = NameType<Uuid, typeof __name__>

const ExerciseId = {
  fromString: (value: string): Either<InvalidUuid, ExerciseId> => {
    const uuid = Uuid.fromString(value)
    const isInvalidUuid = Either.isLeft(uuid)

    if (isInvalidUuid) return uuid

    return Either.right({ __name__, value })
  },
} as const

export default ExerciseId
