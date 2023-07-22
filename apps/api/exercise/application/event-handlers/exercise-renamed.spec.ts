import ExerciseRenamed from '~/exercise/domain/events/exercise-renamed'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import Either, { Left } from '~/shared/either'
import ExerciseViewsMock from '~/test/mocks/exercise/application/services/views'

import ExerciseView from '../models/view'
import ExerciseViews from '../services/views'
import ExerciseRenamedHandler from './exercise-renamed'

describe('ExerciseRenamedHandler', () => {
  let views: ExerciseViews
  let renamedHandler: ExerciseRenamedHandler

  beforeEach(() => {
    views = ExerciseViewsMock.mock()
    renamedHandler = new ExerciseRenamedHandler(views)
  })

  it('renames an exercise view with exercise renamed', async () => {
    const id = 'id'
    const name = 'name'
    const description = 'description'
    const view = ExerciseView.with({ description, id, name })

    const viewsRename = jest.spyOn(views, 'rename')
    const viewsWithId = jest.spyOn(views, 'withId')

    viewsWithId.mockResolvedValue(Either.right(view))

    const anotherName = 'anotherName'
    await renamedHandler.handle(ExerciseRenamed.with({ id, name: anotherName }))

    expect(viewsRename).toHaveBeenCalledWith(id, anotherName)
  })

  it('cannot rename an exercise view that does not exist', async () => {
    const id = 'id'
    const notFound = NotFoundExercise.withId(id)

    const viewsRename = jest.spyOn(views, 'rename')
    const viewsWithId = jest.spyOn(views, 'withId')

    viewsWithId.mockResolvedValue(Either.left(notFound))

    const anotherName = 'anotherName'
    const response = (await renamedHandler.handle(
      ExerciseRenamed.with({ id, name: anotherName }),
    )) as Left<NotFoundExercise>

    expect(viewsRename).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
