import { ValueObject } from '~/shared/domain'
import Either from '~/shared/either'

import InvalidWorkoutSets from '../../exceptions/invalid-sets'

const __name__ = 'WorkoutSets'

type WorkoutSets = ValueObject<typeof __name__, number>

const WorkoutSets = {
  fromNumber: (value: number): Either<InvalidWorkoutSets, WorkoutSets> => {
    if (value < 1) return Either.left(InvalidWorkoutSets.causeIsNonPositive())

    if (value > 100) return Either.left(InvalidWorkoutSets.causeIsTooHigh())

    return Either.right({ __name__, value })
  },
} as const

export default WorkoutSets
