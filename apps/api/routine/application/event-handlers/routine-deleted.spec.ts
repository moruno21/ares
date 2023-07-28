import RoutineDeleted from '~/routine/domain/events/routine-deleted'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either, { Left } from '~/shared/either'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'

import RoutineView from '../models/view'
import RoutineViews from '../services/views'
import RoutineDeletedHandler from './routine-deleted'

describe('RoutineDeletedHandler', () => {
  let views: RoutineViews
  let deletedHandler: RoutineDeletedHandler

  beforeEach(() => {
    views = RoutineViewsMock.mock()
    deletedHandler = new RoutineDeletedHandler(views)
  })

  it('deletes a routine view with routine deleted', async () => {
    const id = 'id'
    const name = 'name'
    const description = 'description'
    const workouts = [
      {
        exerciseDescription: 'exerciseDescription',
        exerciseId: 'exerciseId',
        exerciseName: 'exerciseName',
        reps: 8,
        sets: 8,
      },
    ]
    const view = RoutineView.with({ description, id, name, workouts })

    const viewsDelete = jest.spyOn(views, 'delete')
    const viewsWithId = jest.spyOn(views, 'withId')

    viewsWithId.mockResolvedValue(Either.right(view))

    await deletedHandler.handle(RoutineDeleted.with({ id }))

    expect(viewsDelete).toHaveBeenCalledWith(view.id)
  })

  it('cannot delete a routine view that does not exist', async () => {
    const id = 'id'
    const notFound = NotFoundRoutine.withId(id)

    const viewsDelete = jest.spyOn(views, 'delete')
    const viewsWithId = jest.spyOn(views, 'withId')

    viewsWithId.mockResolvedValue(Either.left(notFound))

    const response = (await deletedHandler.handle(
      RoutineDeleted.with({ id }),
    )) as Left<NotFoundRoutine>

    expect(viewsDelete).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
