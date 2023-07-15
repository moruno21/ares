import ExerciseDeleted from '~/exercise/domain/events/exercise-deleted'
import Either from '~/shared/either'
import ExerciseViewsMock from '~/test/mocks/exercise/application/services/views'

import ExerciseView from '../models/view'
import ExerciseViews from '../services/views'
import ExerciseDeletedHandler from './exercise-deleted'

describe('ExerciseDeletedHandler', () => {
  let views: ExerciseViews
  let deletedHandler: ExerciseDeletedHandler

  beforeEach(() => {
    views = ExerciseViewsMock.mock()
    deletedHandler = new ExerciseDeletedHandler(views)
  })

  it('deletes an exercise view with exercise deleted', async () => {
    const id = 'id'
    const name = 'name'
    const description = 'description'
    const view = ExerciseView.with({ description, id, name })

    const viewsDelete = jest.spyOn(views, 'delete')
    const viewsWithId = jest.spyOn(views, 'withId')

    viewsWithId.mockResolvedValue(Either.right(view))

    await deletedHandler.handle(ExerciseDeleted.with({ id }))
    expect(viewsDelete).toHaveBeenCalledWith(view)
  })
})
