import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import ExerciseDescription from '~/exercise/domain/models/description'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import ExerciseName from '~/exercise/domain/models/name'
import Exercises from '~/exercise/domain/services/exercises'
import InvalidRoutineDescription from '~/routine/domain/exceptions/invalid-description'
import InvalidRoutineName from '~/routine/domain/exceptions/invalid-name'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import RoutineDescription from '~/routine/domain/models/description'
import RoutineId from '~/routine/domain/models/id'
import RoutineName from '~/routine/domain/models/name'
import Routine from '~/routine/domain/models/routine'
import RoutineWorkout from '~/routine/domain/models/workout'
import Routines from '~/routine/domain/services/routines'
import { InvalidUuid } from '~/shared/domain'
import Either, { Left } from '~/shared/either'
import ExercisesMock from '~/test/mocks/exercise/domain/services/exercises'
import RoutinesMock from '~/test/mocks/routine/domain/services/routines'
import UsersMock from '~/test/mocks/user/domain/services/users'
import UserEmail from '~/user/domain/models/email'
import UserId from '~/user/domain/models/id'
import UserName from '~/user/domain/models/name'
import User from '~/user/domain/models/user'
import Users from '~/user/domain/services/users'

import EditRoutine from '../edit-routine'
import EditRoutineHandler from './edit-routine'

describe('EditRoutineHandler', () => {
  let exercises: Exercises
  let routines: Routines
  let users: Users
  let editRoutineHandler: EditRoutineHandler

  const idValue = '01f11891-a393-487b-a8d2-ce913191d666'
  const id = RoutineId.fromString(idValue).value as RoutineId
  const nameValue = 'name'
  const name = RoutineName.fromString(nameValue).value as RoutineName
  const descriptionValue = 'description'
  const description = RoutineDescription.fromString(descriptionValue)
    .value as RoutineDescription
  const ownerIdValue = 'b1c09b96-59bb-4b1e-85c0-e392fdeba5cd'
  const ownerId = UserId.fromString(ownerIdValue).value as UserId
  const workoutExerciseIdValue = 'cda1aca4-ffce-492e-9cf7-b8ded3c7e5ba'
  const workoutsValue = [
    {
      exerciseId: workoutExerciseIdValue,
      reps: 10,
      sets: 5,
    },
  ]
  const workouts = workoutsValue.map(
    (workoutValue) =>
      RoutineWorkout.fromValue(workoutValue).value as RoutineWorkout,
  )
  const routine = Routine.create({ description, id, name, ownerId, workouts })

  beforeEach(() => {
    routines = RoutinesMock.mock()
    exercises = ExercisesMock.mock()
    users = UsersMock.mock()
    editRoutineHandler = new EditRoutineHandler(exercises, routines, users)
  })

  it('edits a routine', async () => {
    const anotherNameValue = 'editedName'
    const anotherDescriptionValue = 'editedDescription'
    const anotherWorkouts = [
      { exerciseId: workoutExerciseIdValue, reps: 4, sets: 3 },
      { exerciseId: workoutExerciseIdValue, reps: 6, sets: 4 },
    ]

    const exercisesWithId = jest.spyOn(exercises, 'withId')
    const routinesWithId = jest.spyOn(routines, 'withId')
    const routinesSave = jest.spyOn(routines, 'save')
    const usersWithId = jest.spyOn(users, 'withId')

    exercisesWithId.mockResolvedValue(
      Either.right(
        Exercise.create({
          description: ExerciseDescription.fromString('description')
            .value as ExerciseDescription,
          id: ExerciseId.fromString(workoutExerciseIdValue).value as ExerciseId,
          name: ExerciseName.fromString('name').value as ExerciseName,
        }),
      ),
    )

    usersWithId.mockResolvedValue(
      Either.right(
        User.create({
          email: UserEmail.fromString('name@gmail.com'),
          id: UserId.fromString(ownerIdValue).value as UserId,
          name: UserName.fromString('name'),
        }),
      ),
    )

    routinesWithId.mockResolvedValue(Either.right(routine))

    const response = await editRoutineHandler.execute(
      EditRoutine.with({
        description: anotherDescriptionValue,
        id: idValue,
        name: anotherNameValue,
        ownerId: ownerIdValue,
        workouts: anotherWorkouts,
      }),
    )

    expect(routinesSave).toHaveBeenCalledWith(routine)
    expect(Either.isRight(response)).toBe(true)
    expect(response).toStrictEqual(Either.right(routine))
  })

  it.each([
    {
      descriptionMock:
        'InvalidDescription: In the vast expanse of the cosmos, countless stars twinkle in the darkness, each one a beacon of light amidst the void. Galaxies spiral and collide, giving birth to new worlds and cosmic wonders. On our tiny planet Earth, life flourishes in all its forms.',
      idMock: idValue,
      nameMock: nameValue,
    },
    {
      descriptionMock: descriptionValue,
      idMock: 'InvalidId',
      nameMock: nameValue,
    },
    {
      descriptionMock: descriptionValue,
      idMock: ' ',
      nameMock: nameValue,
    },
    {
      descriptionMock: descriptionValue,
      idMock: idValue,
      nameMock: ' ',
    },
    {
      descriptionMock: descriptionValue,
      idMock: idValue,
      nameMock: 'InvalidName because it is longer than fifty characters',
    },
  ])(
    'cannot edit a routine with invalid params',
    async ({ descriptionMock, idMock, nameMock }) => {
      const exercisesWithId = jest.spyOn(exercises, 'withId')
      const routinesWithId = jest.spyOn(routines, 'withId')
      const routinesSave = jest.spyOn(routines, 'save')
      const usersWithId = jest.spyOn(users, 'withId')

      exercisesWithId.mockResolvedValue(
        Either.right(
          Exercise.create({
            description: ExerciseDescription.fromString('description')
              .value as ExerciseDescription,
            id: ExerciseId.fromString(workoutExerciseIdValue)
              .value as ExerciseId,
            name: ExerciseName.fromString('name').value as ExerciseName,
          }),
        ),
      )

      usersWithId.mockResolvedValue(
        Either.right(
          User.create({
            email: UserEmail.fromString('name@gmail.com'),
            id: UserId.fromString(ownerIdValue).value as UserId,
            name: UserName.fromString('name'),
          }),
        ),
      )

      routinesWithId.mockResolvedValue(Either.right(routine))

      const response = (await editRoutineHandler.execute(
        EditRoutine.with({
          description: descriptionMock,
          id: idMock,
          name: nameMock,
          ownerId: ownerIdValue,
          workouts: workoutsValue,
        }),
      )) as Left<
        (InvalidUuid | InvalidRoutineName | InvalidRoutineDescription)[]
      >

      expect(routinesSave).not.toHaveBeenCalled()
      expect(Either.isRight(response)).toBe(false)

      if (Either.isLeft(RoutineId.fromString(idMock))) {
        const responseResult = Either.left(response.value[0] as InvalidUuid)
        const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(idMock)

        expect(routinesWithId).not.toHaveBeenCalled()
        expect(Either.isRight(responseResult)).toBe(false)
        expect(responseResult.value.__name__).toBe(invalidUuid.__name__)
        expect(responseResult.value.code).toBe(invalidUuid.code)
      }

      if (Either.isLeft(RoutineDescription.fromString(descriptionMock))) {
        const responseResult = Either.left(
          response.value[0] as InvalidRoutineDescription,
        )
        const invalidDescription = InvalidRoutineDescription.causeIsTooLong()

        expect(Either.isRight(responseResult)).toBe(false)
        expect(responseResult.value.__name__).toBe(invalidDescription.__name__)
        expect(responseResult.value.code).toBe(invalidDescription.code)
      }

      if (Either.isLeft(RoutineName.fromString(nameMock))) {
        const responseResult = Either.left(
          response.value[0] as InvalidRoutineName,
        )
        const invalidNameCauseIsBlank = InvalidRoutineName.causeIsBlank()
        const invalidNameCauseIsTooLong = InvalidRoutineName.causeIsTooLong()

        expect(Either.isRight(responseResult)).toBe(false)
        if (nameMock === ' ') {
          expect(responseResult.value.__name__).toBe(
            invalidNameCauseIsBlank.__name__,
          )
          expect(responseResult.value.code).toBe(invalidNameCauseIsBlank.code)
        } else {
          expect(responseResult.value.__name__).toBe(
            invalidNameCauseIsTooLong.__name__,
          )
          expect(responseResult.value.code).toBe(invalidNameCauseIsTooLong.code)
        }
      }
    },
  )

  it('cannot edit a routine if one of its workout is using a non existent exercise id', async () => {
    const exercisesWithId = jest.spyOn(exercises, 'withId')
    const routinesWithId = jest.spyOn(routines, 'withId')
    const routinesSave = jest.spyOn(routines, 'save')
    const usersWithId = jest.spyOn(users, 'withId')
    const notFound = NotFoundExercise.withId(workoutExerciseIdValue)

    exercisesWithId.mockResolvedValue(Either.left(notFound))

    routinesWithId.mockResolvedValue(Either.right(routine))

    usersWithId.mockResolvedValue(
      Either.right(
        User.create({
          email: UserEmail.fromString('name@gmail.com'),
          id: UserId.fromString(ownerIdValue).value as UserId,
          name: UserName.fromString('name'),
        }),
      ),
    )

    const response = (await editRoutineHandler.execute(
      EditRoutine.with({
        description: descriptionValue,
        id: idValue,
        name: nameValue,
        ownerId: ownerIdValue,
        workouts: workoutsValue,
      }),
    )) as Left<NotFoundExercise[]>

    const responseResult = Either.left(response.value[0] as NotFoundExercise)

    expect(routinesWithId).toHaveBeenCalledWith(id)
    expect(routinesSave).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(responseResult.value.__name__).toBe(notFound.__name__)
    expect(responseResult.value.code).toBe(notFound.code)
  })

  it('cannot edit a routine that does not exist', async () => {
    const exercisesWithId = jest.spyOn(exercises, 'withId')
    const routinesWithId = jest.spyOn(routines, 'withId')
    const routinesSave = jest.spyOn(routines, 'save')
    const usersWithId = jest.spyOn(users, 'withId')
    const notFound = NotFoundRoutine.withId(idValue)

    exercisesWithId.mockResolvedValue(
      Either.right(
        Exercise.create({
          description: ExerciseDescription.fromString('description')
            .value as ExerciseDescription,
          id: ExerciseId.fromString(workoutExerciseIdValue).value as ExerciseId,
          name: ExerciseName.fromString('name').value as ExerciseName,
        }),
      ),
    )

    usersWithId.mockResolvedValue(
      Either.right(
        User.create({
          email: UserEmail.fromString('name@gmail.com'),
          id: UserId.fromString(ownerIdValue).value as UserId,
          name: UserName.fromString('name'),
        }),
      ),
    )

    routinesWithId.mockResolvedValue(Either.left(notFound))

    const response = (await editRoutineHandler.execute(
      EditRoutine.with({
        description: descriptionValue,
        id: idValue,
        name: nameValue,
        ownerId: ownerIdValue,
        workouts: workoutsValue,
      }),
    )) as Left<NotFoundRoutine[]>

    expect(routinesWithId).toHaveBeenCalledWith(id)
    expect(routinesSave).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value[0].__name__).toBe(notFound.__name__)
    expect(response.value[0].code).toBe(notFound.code)
  })
})
