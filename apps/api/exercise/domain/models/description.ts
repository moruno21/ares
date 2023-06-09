import { ValueObject } from '~/shared/domain'
import Either from '~/shared/either'

import InvalidExerciseDescription from '../exceptions/invalid-description'

const __name__ = 'ExerciseDescription'

type ExerciseDescription = ValueObject<typeof __name__, string>

const ExerciseDescription = {
  fromString: (
    value: string,
  ): Either<InvalidExerciseDescription, ExerciseDescription> => {
    if (value.length > 250)
      return Either.left(InvalidExerciseDescription.causeIsTooLong())

    return Either.right({ __name__, value })
  },
} as const

export default ExerciseDescription
