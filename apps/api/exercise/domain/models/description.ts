import { ValueObject } from '~/shared/domain'
import Either from '~/shared/either'
import NamedType from '~/shared/named-type'

import InvalidExerciseDescription from '../exceptions/invalid-description'

const __name__ = 'ExerciseDescription'

type ExerciseDescription = NamedType<ValueObject<string>, typeof __name__>

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
