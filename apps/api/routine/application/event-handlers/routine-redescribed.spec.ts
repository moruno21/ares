import RoutineRedescribed from '~/routine/domain/events/routine-redescribed'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either, { Left } from '~/shared/either'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'

import RoutineView from '../models/view'
import RoutineViews from '../services/views'
import RoutineRedescribedHandler from './routine-redescribed'

describe('RoutineRedescribedHandler', () => {
  let views: RoutineViews
  let redescribedHandler: RoutineRedescribedHandler

  beforeEach(() => {
    views = RoutineViewsMock.mock()
    redescribedHandler = new RoutineRedescribedHandler(views)
  })

  it('redescribes a routine view with routine redescribed', async () => {
    const id = 'id'
    const name = 'name'
    const description = 'description'
    const workouts = [
      { exerciseId: '98747d8b-3f2a-4548-b029-ff163b1e8941', reps: 8, sets: 6 },
    ]
    const view = RoutineView.with({ description, id, name, workouts })

    const viewsRedescribed = jest.spyOn(views, 'redescribe')
    const viewsWithId = jest.spyOn(views, 'withId')

    viewsWithId.mockResolvedValue(Either.right(view))

    const anotherDescription = 'anotherDescription'
    await redescribedHandler.handle(
      RoutineRedescribed.with({ description: anotherDescription, id }),
    )

    expect(viewsRedescribed).toHaveBeenCalledWith(id, anotherDescription)
  })

  it('cannot redescribe a routine view that does not exist', async () => {
    const id = 'id'
    const notFound = NotFoundRoutine.withId(id)

    const viewsRedescribed = jest.spyOn(views, 'redescribe')
    const viewsWithId = jest.spyOn(views, 'withId')

    viewsWithId.mockResolvedValue(Either.left(notFound))

    const anotherDescription = 'anotherDescription'

    const response = (await redescribedHandler.handle(
      RoutineRedescribed.with({ description: anotherDescription, id }),
    )) as Left<NotFoundRoutine>

    expect(viewsRedescribed).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
