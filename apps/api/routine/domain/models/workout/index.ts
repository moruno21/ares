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
    (InvalidUuid | InvalidWorkoutReps | InvalidWorkoutSets)[],
    RoutineWorkout
  > => {
    const uuid = Uuid.fromString(value.exerciseId)
    const isInvalidUuid = Either.isLeft(uuid)

    const reps = WorkoutReps.fromNumber(value.reps)
    const isInvalidReps = Either.isLeft(reps)

    const sets = WorkoutSets.fromNumber(value.sets)
    const isInvalidSets = Either.isLeft(sets)

    const exceptions = []
    if (isInvalidUuid) exceptions.push(uuid.value)
    if (isInvalidReps) exceptions.push(reps.value)
    if (isInvalidSets) exceptions.push(sets.value)

    if (isInvalidUuid || isInvalidReps || isInvalidSets)
      return Either.left(exceptions)

    return Either.right({
      __name__,
      value,
    } as RoutineWorkout)
  },
} as const

export default RoutineWorkout
