import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import ExerciseDescription from '~/exercise/domain/models/description'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import ExerciseName from '~/exercise/domain/models/name'
import Exercises from '~/exercise/domain/services/exercises'
import { InvalidUuid } from '~/shared/domain'
import Either, { Left } from '~/shared/either'
import ExercisesMock from '~/test/mocks/exercise/domain/services/exercises'

import DeleteExercise from '../delete-exercise'
import DeleteExerciseHandler from './delete-exercise'

describe('DeleteExerciseHandler', () => {
  let exercises: Exercises
  let deleteExerciseHandler: DeleteExerciseHandler

  const idValue = '1c681ebb-e97d-45a1-9c0b-95b4b15f2e20'
  const id = ExerciseId.fromString(idValue).value as ExerciseId
  const nameValue = 'name'
  const name = ExerciseName.fromString(nameValue).value as ExerciseName
  const descriptionValue = 'description'
  const description = ExerciseDescription.fromString(descriptionValue)
    .value as ExerciseDescription
  const exercise = Exercise.create({ description, id, name })

  beforeEach(() => {
    exercises = ExercisesMock.mock()
    deleteExerciseHandler = new DeleteExerciseHandler(exercises)
  })

  it('deletes an exercise from an id', async () => {
    const exercisesSave = jest.spyOn(exercises, 'save')
    const exercisesFindWithId = jest.spyOn(exercises, 'findWithId')

    exercisesFindWithId.mockResolvedValue(Either.right(exercise))

    const response = await deleteExerciseHandler.execute(
      DeleteExercise.with({
        id: idValue,
      }),
    )

    expect(exercisesFindWithId).toHaveBeenCalledWith(id)
    expect(exercisesSave).toHaveBeenCalledWith(exercise)
    expect(Either.isRight(response)).toBe(true)
    expect(response).toStrictEqual(Either.right(exercise))
  })

  it('cannot delete an exercise from an invalid id', async () => {
    const idMock = 'invalidUuid'
    const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(idMock)

    const exercisesSave = jest.spyOn(exercises, 'save')
    const exercisesFindWithId = jest.spyOn(exercises, 'findWithId')

    const response = (await deleteExerciseHandler.execute(
      DeleteExercise.with({
        id: idMock,
      }),
    )) as Left<InvalidUuid>

    expect(exercisesFindWithId).not.toHaveBeenCalled()
    expect(exercisesSave).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(invalidUuid.__name__)
    expect(response.value.code).toBe(invalidUuid.code)
  })

  it('cannot delete an exercise that does not exist', async () => {
    const notFound = NotFoundExercise.withId(idValue)

    const exercisesSave = jest.spyOn(exercises, 'save')
    const exercisesFindWithId = jest.spyOn(exercises, 'findWithId')

    exercisesFindWithId.mockResolvedValue(Either.left(notFound))

    const response = (await deleteExerciseHandler.execute(
      DeleteExercise.with({
        id: idValue,
      }),
    )) as Left<NotFoundExercise>

    expect(exercisesFindWithId).toHaveBeenCalledWith(id)
    expect(exercisesSave).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
