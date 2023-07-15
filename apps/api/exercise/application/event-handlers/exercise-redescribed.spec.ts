import ExerciseRedescribed from '~/exercise/domain/events/exercise-redescribed'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import Either, { Left } from '~/shared/either'
import ExerciseViewsMock from '~/test/mocks/exercise/application/services/views'

import ExerciseView from '../models/view'
import ExerciseViews from '../services/views'
import ExerciseRedescribedHandler from './exercise-redescribed'

describe('ExerciseRedescribedHandler', () => {
  let views: ExerciseViews
  let redescribedHandler: ExerciseRedescribedHandler

  beforeEach(() => {
    views = ExerciseViewsMock.mock()
    redescribedHandler = new ExerciseRedescribedHandler(views)
  })

  it('renames an exercise view with exercise redescribed', async () => {
    const id = 'id'
    const name = 'name'
    const description = 'description'
    const view = ExerciseView.with({ description, id, name })

    const viewsRedescribe = jest.spyOn(views, 'redescribe')
    const viewsWithId = jest.spyOn(views, 'withId')

    viewsWithId.mockResolvedValue(Either.right(view))

    const anotherDescription = 'anotherDescription'
    await redescribedHandler.handle(
      ExerciseRedescribed.with({ description: anotherDescription, id }),
    )
    expect(viewsRedescribe).toHaveBeenCalledWith(id, anotherDescription)
  })

  it('cannot redescribe an exercise view that does not exist', async () => {
    const id = 'id'
    const notFound = NotFoundExercise.withId(id)

    const viewsRedescribe = jest.spyOn(views, 'redescribe')
    const viewsWithId = jest.spyOn(views, 'withId')

    viewsWithId.mockResolvedValue(Either.left(notFound))

    const anotherDescription = 'anotherDescription'
    const response = (await redescribedHandler.handle(
      ExerciseRedescribed.with({ description: anotherDescription, id }),
    )) as Left<NotFoundExercise>

    expect(viewsRedescribe).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
