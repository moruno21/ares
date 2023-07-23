import { ValueObject } from '~/shared/domain'
import Either from '~/shared/either'

import InvalidExerciseDescription from '../exceptions/invalid-description'

const __name__ = 'ExerciseDescription'

const MAX_LENGHT = 250

type ExerciseDescription = ValueObject<typeof __name__, string>

const ExerciseDescription = {
  fromString: (
    value: ExerciseDescription['value'],
  ): Either<InvalidExerciseDescription, ExerciseDescription> => {
    if (value.length > MAX_LENGHT)
      return Either.left(InvalidExerciseDescription.causeIsTooLong())

    return Either.right({ __name__, value })
  },
} as const

export default ExerciseDescription
