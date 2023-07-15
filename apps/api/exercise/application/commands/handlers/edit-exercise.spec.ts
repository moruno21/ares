import InvalidExerciseDescription from '~/exercise/domain/exceptions/invalid-description'
import InvalidExerciseName from '~/exercise/domain/exceptions/invalid-name'
import NotEditedExercise from '~/exercise/domain/exceptions/not-edited'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import ExerciseDescription from '~/exercise/domain/models/description'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import ExerciseName from '~/exercise/domain/models/name'
import Exercises from '~/exercise/domain/services/exercises'
import { InvalidUuid } from '~/shared/domain'
import Either, { Left } from '~/shared/either'
import ExerciseViewsMock from '~/test/mocks/exercise/application/services/views'
import ExercisesMock from '~/test/mocks/exercise/domain/services/exercises'

import ExerciseView from '../../models/view'
import ExerciseViews from '../../services/views'
import EditExercise from '../edit-exercise'
import EditExerciseHandler from './edit-exercise'

describe('EditExerciseHandler', () => {
  let exercises: Exercises
  let views: ExerciseViews
  let editExerciseHandler: EditExerciseHandler

  const idValue = '2f74e499-cf59-43c9-a9bf-b00486e8238f'
  const id = ExerciseId.fromString(idValue).value as ExerciseId
  const nameValue = 'name'
  const name = ExerciseName.fromString(nameValue).value as ExerciseName
  const descriptionValue = 'description'
  const description = ExerciseDescription.fromString(descriptionValue)
    .value as ExerciseDescription
  const exercise = Exercise.create({ description, id, name })

  beforeEach(() => {
    exercises = ExercisesMock.mock()
    views = ExerciseViewsMock.mock()
    editExerciseHandler = new EditExerciseHandler(exercises, views)
  })

  it('edits an exercise', async () => {
    const anotherNameValue = 'editedName'
    const anotherDescriptionValue = 'editedDescription'
    const viewsWithName = jest.spyOn(views, 'withName')
    const exercisesFindWithId = jest.spyOn(exercises, 'findWithId')
    const exercisesSave = jest.spyOn(exercises, 'save')

    viewsWithName.mockResolvedValue(
      Either.left(NotFoundExercise.withName(nameValue)),
    )
    exercisesFindWithId.mockResolvedValue(Either.right(exercise))

    const response = await editExerciseHandler.execute(
      EditExercise.with({
        description: anotherDescriptionValue,
        id: idValue,
        name: anotherNameValue,
      }),
    )

    expect(viewsWithName).toHaveBeenCalledWith(anotherNameValue)
    expect(exercisesSave).toHaveBeenCalledWith(exercise)
    expect(Either.isRight(response)).toBe(true)
    expect(response).toStrictEqual(Either.right(exercise))
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
    'cannot edit an exercise with invalid params',
    async ({ descriptionMock, idMock, nameMock }) => {
      const viewsWithName = jest.spyOn(views, 'withName')
      const exercisesFindWithId = jest.spyOn(exercises, 'findWithId')
      const exercisesSave = jest.spyOn(exercises, 'save')

      const response = (await editExerciseHandler.execute(
        EditExercise.with({
          description: descriptionMock,
          id: idMock,
          name: nameMock,
        }),
      )) as Left<InvalidExerciseDescription | InvalidExerciseName | InvalidUuid>

      expect(viewsWithName).not.toHaveBeenCalled()
      expect(exercisesFindWithId).not.toHaveBeenCalled()
      expect(exercisesSave).not.toHaveBeenCalled()
      expect(Either.isRight(response)).toBe(false)

      if (Either.isLeft(ExerciseId.fromString(idMock))) {
        const responseResult = Either.left(response.value as InvalidUuid)
        const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(idMock)

        expect(Either.isRight(responseResult)).toBe(false)
        expect(responseResult.value.__name__).toBe(invalidUuid.__name__)
        expect(responseResult.value.code).toBe(invalidUuid.code)
      }

      if (Either.isLeft(ExerciseDescription.fromString(descriptionMock))) {
        const responseResult = Either.left(
          response.value as InvalidExerciseDescription,
        )
        const invalidDescription = InvalidExerciseDescription.causeIsTooLong()

        expect(Either.isRight(responseResult)).toBe(false)
        expect(responseResult.value.__name__).toBe(invalidDescription.__name__)
        expect(responseResult.value.code).toBe(invalidDescription.code)
      }

      if (Either.isLeft(ExerciseName.fromString(nameMock))) {
        const responseResult = Either.left(
          response.value as InvalidExerciseName,
        )
        const invalidNameCauseIsBlank = InvalidExerciseName.causeIsBlank()
        const invalidNameCauseIsTooLong = InvalidExerciseName.causeIsTooLong()

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

  it('cannot edit an exercise with a name that is already used by another exercise', async () => {
    const anotherIdValue = '43663f42-f467-4b4f-aef5-d114fd3ac50f'
    const viewsWithName = jest.spyOn(views, 'withName')
    const exercisesFindWithId = jest.spyOn(exercises, 'findWithId')
    const exercisesSave = jest.spyOn(exercises, 'save')
    const notEdited = NotEditedExercise.causeAlreadyExistsOneWithName(nameValue)

    viewsWithName.mockResolvedValue(
      Either.right(
        ExerciseView.with({
          description: descriptionValue,
          id: anotherIdValue,
          name: nameValue,
        }),
      ),
    )

    const response = (await editExerciseHandler.execute(
      EditExercise.with({
        description: descriptionValue,
        id: idValue,
        name: nameValue,
      }),
    )) as Left<NotEditedExercise>

    expect(viewsWithName).toHaveBeenCalledWith(nameValue)
    expect(exercisesFindWithId).not.toHaveBeenCalled()
    expect(exercisesSave).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notEdited.__name__)
    expect(response.value.code).toBe(notEdited.code)
  })

  it('cannot edit an exercise that does not exist', async () => {
    const viewsWithName = jest.spyOn(views, 'withName')
    const exercisesFindWithId = jest.spyOn(exercises, 'findWithId')
    const exercisesSave = jest.spyOn(exercises, 'save')
    const notFound = NotFoundExercise.withId(idValue)

    viewsWithName.mockResolvedValue(
      Either.left(NotFoundExercise.withName(nameValue)),
    )
    exercisesFindWithId.mockResolvedValue(Either.left(notFound))

    const response = (await editExerciseHandler.execute(
      EditExercise.with({
        description: descriptionValue,
        id: idValue,
        name: nameValue,
      }),
    )) as Left<NotFoundExercise>

    expect(viewsWithName).toHaveBeenCalledWith(nameValue)
    expect(exercisesFindWithId).toHaveBeenCalledWith(id)
    expect(exercisesSave).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
