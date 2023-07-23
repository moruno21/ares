import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import { InvalidUuid } from '~/shared/domain'
import Either, { Left } from '~/shared/either'
import ExerciseViewsMock from '~/test/mocks/exercise/application/services/views'

import ExerciseView from '../../models/view'
import ExerciseViews from '../../services/views'
import GetExercise from '../get-exercise'
import GetExerciseHandler from './get-exercise'

describe('GetExercise', () => {
  let views: ExerciseViews
  let getExerciseHandler: GetExerciseHandler
  const id = '2a116797-ec97-43f2-b818-e1f16723c898'
  const name = 'name'
  const description = 'description'

  beforeEach(() => {
    views = ExerciseViewsMock.mock()
    getExerciseHandler = new GetExerciseHandler(views)
  })

  it('gets an exercise from an id', async () => {
    const viewsWithId = jest.spyOn(views, 'withId')

    const exerciseView = ExerciseView.with({ description, id, name })

    viewsWithId.mockResolvedValue(Either.right(exerciseView))

    const response = await getExerciseHandler.execute(GetExercise.with({ id }))

    expect(viewsWithId).toHaveBeenCalledWith(id)
    expect(Either.isRight(response)).toBe(true)
    expect(response).toStrictEqual(Either.right(exerciseView))
  })

  it('cannot get an exercise from an invalid id', async () => {
    const viewsWithId = jest.spyOn(views, 'withId')
    const notValidId = 'invalidId'
    const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(notValidId)

    const response = (await getExerciseHandler.execute(
      GetExercise.with({ id: notValidId }),
    )) as Left<InvalidUuid[]>

    expect(viewsWithId).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value[0].__name__).toBe(invalidUuid.__name__)
    expect(response.value[0].code).toBe(invalidUuid.code)
  })

  it('cannot get an exercise that does not exist', async () => {
    const viewsWithId = jest.spyOn(views, 'withId')
    const notFoundExercise = NotFoundExercise.withId(id)

    viewsWithId.mockResolvedValue(Either.left(NotFoundExercise.withId(id)))

    const response = (await getExerciseHandler.execute(
      GetExercise.with({ id }),
    )) as Left<NotFoundExercise[]>

    expect(viewsWithId).toHaveBeenCalledWith(id)
    expect(Either.isRight(response)).toBe(false)
    expect(response.value[0].__name__).toBe(notFoundExercise.__name__)
    expect(response.value[0].code).toBe(notFoundExercise.code)
  })
})
