import RoutineCreated from '~/routine/domain/events/routine-created'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'

import RoutineView from '../models/view'
import RoutineViews from '../services/views'
import RoutineCreatedHandler from './routine-created'

describe('RoutineCreatedHandler', () => {
  let views: RoutineViews
  let createdHandler: RoutineCreatedHandler

  beforeEach(() => {
    views = RoutineViewsMock.mock()
    createdHandler = new RoutineCreatedHandler(views)
  })

  it('creates a routine view with routine created', async () => {
    const id = 'id'
    const name = 'name'
    const description = 'description'
    const workouts = [{ exerciseId: 'exerciseId', reps: 12, sets: 3 }]
    const viewsAdd = jest.spyOn(views, 'add')

    await createdHandler.handle(
      RoutineCreated.with({ description, id, name, workouts }),
    )

    expect(viewsAdd).toHaveBeenCalledWith(
      RoutineView.with({ description, id, name, workouts }),
    )
  })
})
