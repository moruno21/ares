import { ValueObject } from '~/shared/domain'
import Either from '~/shared/either'

import InvalidRoutineName from '../exceptions/invalid-name'

const __name__ = 'RoutineName'

const MAX_LENGHT = 50

type RoutineName = ValueObject<typeof __name__, string>

const RoutineName = {
  fromString: (value: string): Either<InvalidRoutineName, RoutineName> => {
    const isBlank = !value.trim()

    if (isBlank) return Either.left(InvalidRoutineName.causeIsBlank())

    if (value.length > MAX_LENGHT)
      return Either.left(InvalidRoutineName.causeIsTooLong())

    return Either.right({ __name__, value })
  },
} as const

export default RoutineName
