import InvalidExerciseDescription from '~/exercise/domain/exceptions/invalid-description'
import InvalidExerciseName from '~/exercise/domain/exceptions/invalid-name'
import NotCreatedExercise from '~/exercise/domain/exceptions/not-created'
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
import CreateExercise from '../create-exercise'
import CreateExerciseHandler from './create-exercise'

describe('CreateExerciseHandler', () => {
  let exercises: Exercises
  let views: ExerciseViews
  let createExerciseHandler: CreateExerciseHandler

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
    views = ExerciseViewsMock.mock()
    createExerciseHandler = new CreateExerciseHandler(exercises, views)
  })

  it('creates an exercise', async () => {
    const exercisesSave = jest.spyOn(exercises, 'save')
    const viewsWithName = jest.spyOn(views, 'withName')

    viewsWithName.mockResolvedValue(
      Either.left(NotFoundExercise.withName(nameValue)),
    )

    const response = await createExerciseHandler.execute(
      CreateExercise.with({
        description: descriptionValue,
        id: idValue,
        name: nameValue,
      }),
    )

    expect(viewsWithName).toHaveBeenCalledWith(nameValue)
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
    'cannot create an exercise with invalid params',
    async ({ descriptionMock, idMock, nameMock }) => {
      const exercisesSave = jest.spyOn(exercises, 'save')
      const viewsWithName = jest.spyOn(views, 'withName')

      viewsWithName.mockResolvedValue(
        Either.left(NotFoundExercise.withName(nameValue)),
      )

      const response = (await createExerciseHandler.execute(
        CreateExercise.with({
          description: descriptionMock,
          id: idMock,
          name: nameMock,
        }),
      )) as Left<
        (InvalidUuid | InvalidExerciseName | InvalidExerciseDescription)[]
      >

      if (Either.isLeft(ExerciseName.fromString(nameMock)))
        expect(viewsWithName).not.toHaveBeenCalled()
      else expect(viewsWithName).toHaveBeenCalledWith(nameMock)

      expect(exercisesSave).not.toHaveBeenCalled()
      expect(Either.isRight(response)).toBe(false)

      if (Either.isLeft(ExerciseId.fromString(idMock))) {
        const responseResult = Either.left(response.value[0] as InvalidUuid)
        const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(idMock)

        expect(Either.isRight(responseResult)).toBe(false)
        expect(responseResult.value.__name__).toBe(invalidUuid.__name__)
        expect(responseResult.value.code).toBe(invalidUuid.code)
      }

      if (Either.isLeft(ExerciseDescription.fromString(descriptionMock))) {
        const responseResult = Either.left(
          response.value[0] as InvalidExerciseDescription,
        )
        const invalidDescription = InvalidExerciseDescription.causeIsTooLong()

        expect(Either.isRight(responseResult)).toBe(false)
        expect(responseResult.value.__name__).toBe(invalidDescription.__name__)
        expect(responseResult.value.code).toBe(invalidDescription.code)
      }

      if (Either.isLeft(ExerciseName.fromString(nameMock))) {
        const responseResult = Either.left(
          response.value[0] as InvalidExerciseName,
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

  it('cannot create an exercise whose name is already used by another exercise', async () => {
    const exercisesSave = jest.spyOn(exercises, 'save')
    const viewsWithName = jest.spyOn(views, 'withName')
    const notCreated =
      NotCreatedExercise.causeAlreadyExistsOneWithName(nameValue)

    viewsWithName.mockResolvedValue(
      Either.right(
        ExerciseView.with({
          description: descriptionValue,
          id: idValue,
          name: nameValue,
        }),
      ),
    )

    const response = (await createExerciseHandler.execute(
      CreateExercise.with({
        description: descriptionValue,
        id: idValue,
        name: nameValue,
      }),
    )) as Left<NotCreatedExercise[]>

    expect(viewsWithName).toHaveBeenCalledWith(nameValue)
    expect(exercisesSave).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value[0].__name__).toBe(notCreated.__name__)
    expect(response.value[0].code).toBe(notCreated.code)
  })
})
