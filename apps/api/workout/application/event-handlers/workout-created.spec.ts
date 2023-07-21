import WorkoutViewsMock from '~/test/mocks/workout/application/services/views'
import WorkoutCreated from '~/workout/domain/events/workout-created'

import WorkoutView from '../models/view'
import WorkoutViews from '../services/views'
import WorkoutCreatedHandler from './workout-created'

describe('WorkoutCreatedHandler', () => {
  let views: WorkoutViews
  let createdHandler: WorkoutCreatedHandler

  beforeEach(() => {
    views = WorkoutViewsMock.mock()
    createdHandler = new WorkoutCreatedHandler(views)
  })

  it('creates a workout view with workout created', async () => {
    const id = 'id'
    const exerciseId = 'exerciseId'
    const reps = 4
    const sets = 4
    const viewsAdd = jest.spyOn(views, 'add')

    await createdHandler.handle(
      WorkoutCreated.with({ exerciseId, id, reps, sets }),
    )
    expect(viewsAdd).toHaveBeenCalledWith(
      WorkoutView.with({ exerciseId, id, reps, sets }),
    )
  })
})
