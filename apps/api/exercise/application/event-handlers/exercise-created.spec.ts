import ExerciseCreated from '~/exercise/domain/events/exercise-created'
import ExerciseViewsMock from '~/test/mocks/exercise/application/services/views'

import ExerciseView from '../models/view'
import ExerciseViews from '../services/views'
import ExerciseCreatedHandler from './exercise-created'

describe('ExerciseCreatedHandler', () => {
  let views: ExerciseViews
  let createdHandler: ExerciseCreatedHandler

  beforeEach(() => {
    views = ExerciseViewsMock.mock()
    createdHandler = new ExerciseCreatedHandler(views)
  })

  it('creates an exercise view with exercise created', async () => {
    const id = 'id'
    const name = 'name'
    const description = 'description'
    const viewsAdd = jest.spyOn(views, 'add')

    await createdHandler.handle(ExerciseCreated.with({ description, id, name }))

    expect(viewsAdd).toHaveBeenCalledWith(
      ExerciseView.with({ description, id, name }),
    )
  })
})
