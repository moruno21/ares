import { ValueObject } from '~/shared/domain'
import Either from '~/shared/either'

import InvalidRoutineDescription from '../exceptions/invalid-description'

const __name__ = 'RoutineDescription'

const MAX_LENGHT = 250

type RoutineDescription = ValueObject<typeof __name__, string>

const RoutineDescription = {
  fromString: (
    value: string,
  ): Either<InvalidRoutineDescription, RoutineDescription> => {
    if (value.length > MAX_LENGHT)
      return Either.left(InvalidRoutineDescription.causeIsTooLong())

    return Either.right({ __name__, value })
  },
} as const

export default RoutineDescription
