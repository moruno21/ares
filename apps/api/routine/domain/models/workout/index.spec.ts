import { InvalidUuid } from '~/shared/domain'
import Either, { Left, Right } from '~/shared/either'
import { itIsAValueObject } from '~/test/closures/shared/domain/value-object'

import InvalidWorkoutReps from '../../exceptions/invalid-reps'
import InvalidWorkoutSets from '../../exceptions/invalid-sets'
import RoutineWorkout from './index'

describe('RoutineWorkout', () => {
  const __name__ = 'RoutineWorkout'
  const exerciseIdValue = 'd091e921-2569-4241-9e42-95d370c852c4'
  const repsValue = 6
  const setsValue = 4
  const value = {
    exerciseId: exerciseIdValue,
    reps: repsValue,
    sets: setsValue,
  }
  const workout = RoutineWorkout.fromValue(value) as Right<RoutineWorkout>

  itIsAValueObject(workout.value)

  it.concurrent('can be created from value', () => {
    expect(Either.isRight(workout)).toBe(true)
    expect(workout.value.__name__).toBe(__name__)
    expect(workout.value.value).toBe(value)
  })

  it.each([
    { invalidExerciseIdValue: ' ' },
    { invalidExerciseIdValue: 'invalidId' },
  ])(
    'cannot be created with an invalid exercise id',
    ({ invalidExerciseIdValue }) => {
      const workoutWithInvalidExerciseId = RoutineWorkout.fromValue({
        exerciseId: invalidExerciseIdValue,
        reps: repsValue,
        sets: setsValue,
      }) as Left<InvalidUuid[]>
      const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(
        invalidExerciseIdValue,
      )

      expect(Either.isRight(workoutWithInvalidExerciseId)).toBe(false)
      expect(workoutWithInvalidExerciseId.value[0].__name__).toBe(
        invalidUuid.__name__,
      )
      expect(workoutWithInvalidExerciseId.value[0].code).toBe(invalidUuid.code)
    },
  )

  it.each([
    { invalidRepsValue: -4 },
    { invalidRepsValue: 0 },
    { invalidRepsValue: 150 },
  ])('cannot be created with invalid reps', ({ invalidRepsValue }) => {
    const workoutWithInvalidReps = RoutineWorkout.fromValue({
      exerciseId: exerciseIdValue,
      reps: invalidRepsValue,
      sets: setsValue,
    }) as Left<InvalidWorkoutReps[]>

    const nonPositiveReps = InvalidWorkoutReps.causeIsNonPositive()
    const tooHighReps = InvalidWorkoutReps.causeIsTooHigh()

    expect(Either.isRight(workoutWithInvalidReps)).toBe(false)

    if (invalidRepsValue < 1) {
      expect(workoutWithInvalidReps.value[0].__name__).toBe(
        nonPositiveReps.__name__,
      )
      expect(workoutWithInvalidReps.value[0].code).toBe(nonPositiveReps.code)
    } else {
      expect(workoutWithInvalidReps.value[0].__name__).toBe(
        tooHighReps.__name__,
      )
      expect(workoutWithInvalidReps.value[0].code).toBe(tooHighReps.code)
    }
  })

  it.each([
    { invalidSetsValue: -4 },
    { invalidSetsValue: 0 },
    { invalidSetsValue: 150 },
  ])('cannot be created with invalid sets', ({ invalidSetsValue }) => {
    const workoutWithInvalidSets = RoutineWorkout.fromValue({
      exerciseId: exerciseIdValue,
      reps: repsValue,
      sets: invalidSetsValue,
    }) as Left<InvalidWorkoutSets[]>

    const nonPositiveSets = InvalidWorkoutSets.causeIsNonPositive()
    const tooHighSets = InvalidWorkoutSets.causeIsTooHigh()

    expect(Either.isRight(workoutWithInvalidSets)).toBe(false)

    if (invalidSetsValue < 1) {
      expect(workoutWithInvalidSets.value[0].__name__).toBe(
        nonPositiveSets.__name__,
      )
      expect(workoutWithInvalidSets.value[0].code).toBe(nonPositiveSets.code)
    } else {
      expect(workoutWithInvalidSets.value[0].__name__).toBe(
        tooHighSets.__name__,
      )
      expect(workoutWithInvalidSets.value[0].code).toBe(tooHighSets.code)
    }
  })
})
