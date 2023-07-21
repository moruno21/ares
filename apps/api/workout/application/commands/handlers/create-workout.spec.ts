import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import ExerciseDescription from '~/exercise/domain/models/description'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import ExerciseName from '~/exercise/domain/models/name'
import Exercises from '~/exercise/domain/services/exercises'
import { InvalidUuid } from '~/shared/domain'
import Either, { Left } from '~/shared/either'
import ExercisesMock from '~/test/mocks/exercise/domain/services/exercises'
import WorkoutsMock from '~/test/mocks/workout/domain/services/workouts'
import InvalidWorkoutReps from '~/workout/domain/exceptions/invalid-reps'
import InvalidWorkoutSets from '~/workout/domain/exceptions/invalid-sets'
import WorkoutId from '~/workout/domain/models/id'
import WorkoutReps from '~/workout/domain/models/reps'
import WorkoutSets from '~/workout/domain/models/sets'
import Workout from '~/workout/domain/models/workout'
import Workouts from '~/workout/domain/services/workouts'

import CreateWorkout from '../create-workout'
import CreateWorkoutHandler from './create-workout'

describe('CreateWorkoutHandler', () => {
  let exercises: Exercises
  let workouts: Workouts
  let createWorkoutHandler: CreateWorkoutHandler

  const idValue = 'a6011f50-5155-469d-9aca-2560cf52b0a2'
  const id = WorkoutId.fromString(idValue).value as WorkoutId
  const exerciseIdValue = '72a37bed-19ae-49ff-87ca-1891f98e86a4'
  const exerciseId = ExerciseId.fromString(exerciseIdValue).value as ExerciseId
  const repsValue = 8
  const reps = WorkoutReps.fromNumber(repsValue).value as WorkoutReps
  const setsValue = 4
  const sets = WorkoutSets.fromNumber(setsValue).value as WorkoutSets
  const workout = Workout.create({ exerciseId, id, reps, sets })

  beforeEach(() => {
    exercises = ExercisesMock.mock()
    workouts = WorkoutsMock.mock()
    createWorkoutHandler = new CreateWorkoutHandler(exercises, workouts)
  })

  it('creates a workout', async () => {
    const workoutsSave = jest.spyOn(workouts, 'save')
    const exercisesFindWithId = jest.spyOn(exercises, 'findWithId')

    exercisesFindWithId.mockResolvedValue(
      Either.right(
        Exercise.create({
          description: ExerciseDescription.fromString('mockExerciseDescription')
            .value as ExerciseDescription,
          id: exerciseId,
          name: ExerciseName.fromString('mockExerciseName')
            .value as ExerciseName,
        }),
      ),
    )

    const response = await createWorkoutHandler.execute(
      CreateWorkout.with({
        exerciseId: exerciseIdValue,
        id: idValue,
        reps: repsValue,
        sets: setsValue,
      }),
    )

    expect(exercisesFindWithId).toHaveBeenCalledWith(exerciseId)
    expect(workoutsSave).toHaveBeenCalledWith(workout)
    expect(Either.isRight(response)).toBe(true)
    expect(response).toStrictEqual(Either.right(workout))
  })

  it.each([
    {
      exerciseIdMock: 'InvalidId',
      idMock: idValue,
      repsMock: repsValue,
      setsMock: setsValue,
    },
    {
      exerciseIdMock: exerciseIdValue,
      idMock: 'InvalidId',
      repsMock: repsValue,
      setsMock: setsValue,
    },
    {
      exerciseIdMock: exerciseIdValue,
      idMock: idValue,
      repsMock: -1,
      setsMock: setsValue,
    },
    {
      exerciseIdMock: exerciseIdValue,
      idMock: idValue,
      repsMock: 200,
      setsMock: setsValue,
    },
    {
      exerciseIdMock: exerciseIdValue,
      idMock: idValue,
      repsMock: repsValue,
      setsMock: 0,
    },
    {
      exerciseIdMock: exerciseIdValue,
      idMock: idValue,
      repsMock: repsValue,
      setsMock: 150,
    },
  ])(
    'cannot create a workout with invalid params',
    async ({ exerciseIdMock, idMock, repsMock, setsMock }) => {
      const workoutsSave = jest.spyOn(workouts, 'save')
      const exercisesFindWithId = jest.spyOn(exercises, 'findWithId')

      exercisesFindWithId.mockResolvedValue(
        Either.right(
          Exercise.create({
            description: ExerciseDescription.fromString(
              'mockExerciseDescription',
            ).value as ExerciseDescription,
            id: exerciseId,
            name: ExerciseName.fromString('mockExerciseName')
              .value as ExerciseName,
          }),
        ),
      )

      const response = (await createWorkoutHandler.execute(
        CreateWorkout.with({
          exerciseId: exerciseIdMock,
          id: idMock,
          reps: repsMock,
          sets: setsMock,
        }),
      )) as Left<(InvalidUuid | InvalidWorkoutReps | InvalidWorkoutSets)[]>

      if (Either.isLeft(ExerciseId.fromString(exerciseIdMock)))
        expect(exercisesFindWithId).not.toHaveBeenCalled()
      else
        expect(exercisesFindWithId).toHaveBeenCalledWith(
          ExerciseId.fromString(exerciseIdMock).value,
        )

      expect(workoutsSave).not.toHaveBeenCalled()
      expect(Either.isRight(response)).toBe(false)

      if (Either.isLeft(WorkoutId.fromString(idMock))) {
        const responseResult = Either.left(response.value[0] as InvalidUuid)
        const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(idMock)

        expect(Either.isRight(responseResult)).toBe(false)
        expect(responseResult.value.__name__).toBe(invalidUuid.__name__)
        expect(responseResult.value.code).toBe(invalidUuid.code)
      }

      if (Either.isLeft(ExerciseId.fromString(exerciseIdMock))) {
        const responseResult = Either.left(response.value[0] as InvalidUuid)
        const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(exerciseIdMock)

        expect(Either.isRight(responseResult)).toBe(false)
        expect(responseResult.value.__name__).toBe(invalidUuid.__name__)
        expect(responseResult.value.code).toBe(invalidUuid.code)
      }

      if (Either.isLeft(WorkoutReps.fromNumber(repsMock))) {
        const responseResult = Either.left(
          response.value[0] as InvalidWorkoutReps,
        )
        const invalidRepsCauseIsNonPositive =
          InvalidWorkoutReps.causeIsNonPositive()
        const invalidRepsCauseIsTooHigh = InvalidWorkoutReps.causeIsTooHigh()

        expect(Either.isRight(responseResult)).toBe(false)
        if (repsMock < 1) {
          expect(responseResult.value.__name__).toBe(
            invalidRepsCauseIsNonPositive.__name__,
          )
          expect(responseResult.value.code).toBe(
            invalidRepsCauseIsNonPositive.code,
          )
        } else {
          expect(responseResult.value.__name__).toBe(
            invalidRepsCauseIsTooHigh.__name__,
          )
          expect(responseResult.value.code).toBe(invalidRepsCauseIsTooHigh.code)
        }
      }

      if (Either.isLeft(WorkoutSets.fromNumber(setsMock))) {
        const responseResult = Either.left(
          response.value[0] as InvalidWorkoutSets,
        )
        const invalidSetsCauseIsNonPositive =
          InvalidWorkoutSets.causeIsNonPositive()
        const invalidSetsCauseIsTooHigh = InvalidWorkoutSets.causeIsTooHigh()

        expect(Either.isRight(responseResult)).toBe(false)
        if (setsMock < 1) {
          expect(responseResult.value.__name__).toBe(
            invalidSetsCauseIsNonPositive.__name__,
          )
          expect(responseResult.value.code).toBe(
            invalidSetsCauseIsNonPositive.code,
          )
        } else {
          expect(responseResult.value.__name__).toBe(
            invalidSetsCauseIsTooHigh.__name__,
          )
          expect(responseResult.value.code).toBe(invalidSetsCauseIsTooHigh.code)
        }
      }
    },
  )

  it('cannot create a workout with an exercise that does not exist', async () => {
    const workoutsSave = jest.spyOn(workouts, 'save')
    const exercisesFindWithId = jest.spyOn(exercises, 'findWithId')
    const notFound = NotFoundExercise.withId(exerciseIdValue)

    exercisesFindWithId.mockResolvedValue(Either.left(notFound))

    const response = (await createWorkoutHandler.execute(
      CreateWorkout.with({
        exerciseId: exerciseIdValue,
        id: idValue,
        reps: repsValue,
        sets: setsValue,
      }),
    )) as Left<NotFoundExercise[]>

    expect(exercisesFindWithId).toHaveBeenCalledWith(exerciseId)
    expect(workoutsSave).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value[0].__name__).toBe(notFound.__name__)
    expect(response.value[0].code).toBe(notFound.code)
  })
})
