import { ValueObject } from '~/shared/domain'
import Either from '~/shared/either'
import NamedType from '~/shared/named-type'

import InvalidExerciseName from '../exceptions/invalid-name'

const __name__ = 'ExerciseName'

type ExerciseName = NamedType<ValueObject<string>, typeof __name__>

const ExerciseName = {
  fromString: (value: string): Either<InvalidExerciseName, ExerciseName> => {
    const isBlank = !value.trim()

    if (isBlank) return Either.left(InvalidExerciseName.causeIsBlank())

    if (value.length > 50)
      return Either.left(InvalidExerciseName.causeIsTooLong())

    return Either.right({ __name__, value })
  },
} as const

export default ExerciseName
