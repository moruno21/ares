import { ValueObject } from '~/shared/domain'
import Either from '~/shared/either'

import InvalidExerciseName from '../exceptions/invalid-name'

const __name__ = 'ExerciseName'

const MAX_LENGHT = 50

type ExerciseName = ValueObject<typeof __name__, string>

const ExerciseName = {
  fromString: (
    value: ExerciseName['value'],
  ): Either<InvalidExerciseName, ExerciseName> => {
    const isBlank = !value.trim()

    if (isBlank) return Either.left(InvalidExerciseName.causeIsBlank())

    if (value.length > MAX_LENGHT)
      return Either.left(InvalidExerciseName.causeIsTooLong())

    return Either.right({ __name__, value })
  },
} as const

export default ExerciseName
