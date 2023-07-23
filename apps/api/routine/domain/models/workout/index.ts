import { InvalidUuid, Uuid, ValueObject } from '~/shared/domain'
import Either from '~/shared/either'

import InvalidWorkoutReps from '../../exceptions/invalid-reps'
import InvalidWorkoutSets from '../../exceptions/invalid-sets'
import WorkoutReps from './reps'
import WorkoutSets from './sets'

const __name__ = 'RoutineWorkout'

type RoutineWorkout = ValueObject<
  typeof __name__,
  {
    exerciseId: string
    reps: number
    sets: number
  }
>

const RoutineWorkout = {
  fromValue: (
    value: RoutineWorkout['value'],
  ): Either<
    InvalidUuid | InvalidWorkoutReps | InvalidWorkoutSets,
    RoutineWorkout
  > => {
    const uuid = Uuid.fromString(value.exerciseId)
    const isInvalidUuid = Either.isLeft(uuid)
    if (isInvalidUuid) return uuid

    const reps = WorkoutReps.fromNumber(value.reps)
    const isInvalidReps = Either.isLeft(reps)
    if (isInvalidReps) return reps

    const sets = WorkoutSets.fromNumber(value.sets)
    const isInvalidSets = Either.isLeft(sets)
    if (isInvalidSets) return sets

    return Either.right({ __name__, value })
  },
} as const

export default RoutineWorkout
