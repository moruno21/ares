import { ValueObject } from '~/shared/domain'
import Either from '~/shared/either'

import InvalidWorkoutReps from '../../exceptions/invalid-reps'

const __name__ = 'WorkoutReps'

type WorkoutReps = ValueObject<typeof __name__, number>

const WorkoutReps = {
  fromNumber: (value: number): Either<InvalidWorkoutReps, WorkoutReps> => {
    if (value < 1) return Either.left(InvalidWorkoutReps.causeIsNonPositive())

    if (value > 100) return Either.left(InvalidWorkoutReps.causeIsTooHigh())

    return Either.right({ __name__, value })
  },
} as const

export default WorkoutReps
