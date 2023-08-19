import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import RoutineDescription from '~/routine/domain/models/description'
import RoutineId from '~/routine/domain/models/id'
import RoutineName from '~/routine/domain/models/name'
import Routine from '~/routine/domain/models/routine'
import RoutineWorkout from '~/routine/domain/models/workout'
import Routines from '~/routine/domain/services/routines'
import { InvalidUuid } from '~/shared/domain'
import Either, { Left } from '~/shared/either'
import RoutinesMock from '~/test/mocks/routine/domain/services/routines'
import UserId from '~/user/domain/models/id'

import DeleteRoutine from '../delete-routine'
import DeleteRoutineHandler from './delete-routine'

describe('DeleteRoutineHandler', () => {
  let routines: Routines
  let deleteRoutineHandler: DeleteRoutineHandler

  const idValue = '1c681ebb-e97d-45a1-9c0b-95b4b15f2e20'
  const id = RoutineId.fromString(idValue).value as RoutineId
  const nameValue = 'name'
  const name = RoutineName.fromString(nameValue).value as RoutineName
  const descriptionValue = 'description'
  const description = RoutineDescription.fromString(descriptionValue)
    .value as RoutineDescription
  const ownerIdValue = 'c449f120-eff4-40e4-aaed-aa40128104dd'
  const ownerId = UserId.fromString(ownerIdValue).value as UserId
  const workoutsValue = [
    {
      exerciseId: 'bc1ac83d-8dbd-4195-bd43-19fcf3c27cab',
      reps: 6,
      sets: 3,
    },
  ]
  const workouts = workoutsValue.map(
    (workoutValue) =>
      RoutineWorkout.fromValue(workoutValue).value as RoutineWorkout,
  )
  const routine = Routine.create({ description, id, name, ownerId, workouts })

  beforeEach(() => {
    routines = RoutinesMock.mock()
    deleteRoutineHandler = new DeleteRoutineHandler(routines)
  })

  it('deletes a routine from an id', async () => {
    const routinesSave = jest.spyOn(routines, 'save')
    const routinesWithId = jest.spyOn(routines, 'withId')

    routinesWithId.mockResolvedValue(Either.right(routine))

    const response = await deleteRoutineHandler.execute(
      DeleteRoutine.with({
        id: idValue,
      }),
    )

    expect(routinesWithId).toHaveBeenCalledWith(id)
    expect(routinesSave).toHaveBeenCalledWith(routine)
    expect(Either.isRight(response)).toBe(true)
    expect(response).toStrictEqual(Either.right(routine))
  })

  it('cannot delete a routine from an invalid id', async () => {
    const idMock = 'invalidUuid'
    const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(idMock)

    const routinesSave = jest.spyOn(routines, 'save')
    const routinesWithId = jest.spyOn(routines, 'withId')

    const response = (await deleteRoutineHandler.execute(
      DeleteRoutine.with({
        id: idMock,
      }),
    )) as Left<InvalidUuid[]>

    expect(routinesWithId).not.toHaveBeenCalled()
    expect(routinesSave).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value[0].__name__).toBe(invalidUuid.__name__)
    expect(response.value[0].code).toBe(invalidUuid.code)
  })

  it('cannot delete a routine that does not exist', async () => {
    const notFound = NotFoundRoutine.withId(idValue)

    const routinesSave = jest.spyOn(routines, 'save')
    const routinesWithId = jest.spyOn(routines, 'withId')

    routinesWithId.mockResolvedValue(Either.left(notFound))

    const response = (await deleteRoutineHandler.execute(
      DeleteRoutine.with({
        id: idValue,
      }),
    )) as Left<NotFoundRoutine[]>

    expect(routinesWithId).toHaveBeenCalledWith(id)
    expect(routinesSave).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value[0].__name__).toBe(notFound.__name__)
    expect(response.value[0].code).toBe(notFound.code)
  })
})
