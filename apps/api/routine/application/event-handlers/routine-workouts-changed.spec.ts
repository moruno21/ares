import RoutineWorkoutsChanged from '~/routine/domain/events/routine-workouts-changed'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either, { Left } from '~/shared/either'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'

import RoutineView from '../models/view'
import RoutineViews from '../services/views'
import RoutineWorkoutsChangedHandler from './routine-workouts-changed'

describe('RoutineWorkoutsChangedHandler', () => {
  let views: RoutineViews
  let workoutsChangedHandler: RoutineWorkoutsChangedHandler

  beforeEach(() => {
    views = RoutineViewsMock.mock()
    workoutsChangedHandler = new RoutineWorkoutsChangedHandler(views)
  })

  it('change workouts of a routine view with routine workouts changed', async () => {
    const id = 'id'
    const name = 'name'
    const description = 'description'
    const workouts = [
      { exerciseId: '98747d8b-3f2a-4548-b029-ff163b1e8941', reps: 8, sets: 6 },
    ]
    const view = RoutineView.with({ description, id, name, workouts })

    const viewsChangeWorkouts = jest.spyOn(views, 'changeWorkouts')
    const viewsWithId = jest.spyOn(views, 'withId')

    viewsWithId.mockResolvedValue(Either.right(view))

    const anotherWorkouts = [
      { exerciseId: '31a72de7-ef7f-43e8-8fd4-b2bbcf9e520b', reps: 6, sets: 5 },
    ]
    await workoutsChangedHandler.handle(
      RoutineWorkoutsChanged.with({ id, workouts: anotherWorkouts }),
    )

    expect(viewsChangeWorkouts).toHaveBeenCalledWith(id, anotherWorkouts)
  })

  it('cannot change workouts of a routine view that does not exist', async () => {
    const id = 'id'
    const notFound = NotFoundRoutine.withId(id)

    const viewsChangeWorkouts = jest.spyOn(views, 'changeWorkouts')
    const viewsWithId = jest.spyOn(views, 'withId')

    viewsWithId.mockResolvedValue(Either.left(notFound))

    const anotherWorkouts = [
      { exerciseId: 'ab41543a-9879-4f9b-a23c-aeffa2725feb', reps: 4, sets: 4 },
    ]

    const response = (await workoutsChangedHandler.handle(
      RoutineWorkoutsChanged.with({ id, workouts: anotherWorkouts }),
    )) as Left<NotFoundRoutine>

    expect(viewsChangeWorkouts).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
