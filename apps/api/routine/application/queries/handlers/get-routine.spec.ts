import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import { InvalidUuid } from '~/shared/domain'
import Either, { Left } from '~/shared/either'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'

import RoutineView from '../../models/view'
import RoutineViews from '../../services/views'
import GetRoutine from '../get-routine'
import GetRoutineHandler from './get-routine'

describe('GetRoutine', () => {
  let views: RoutineViews
  let getRoutineHandler: GetRoutineHandler

  const id = '750b5788-7b43-409b-81b3-91375394897f'
  const name = 'name'
  const description = 'description'
  const ownerId = 'ownerId'
  const workouts = [
    {
      exerciseId: 'exerciseId',
      exerciseName: 'exerciseName',
      reps: 8,
      sets: 4,
    },
  ]

  beforeEach(() => {
    views = RoutineViewsMock.mock()
    getRoutineHandler = new GetRoutineHandler(views)
  })

  it('gets a routine from an id', async () => {
    const viewsWithId = jest.spyOn(views, 'withId')

    const routineView = RoutineView.with({
      description,
      id,
      name,
      ownerId,
      workouts,
    })

    viewsWithId.mockResolvedValue(Either.right(routineView))

    const response = await getRoutineHandler.execute(GetRoutine.with({ id }))

    expect(viewsWithId).toHaveBeenCalledWith(id)
    expect(Either.isRight(response)).toBe(true)
    expect(response).toStrictEqual(Either.right(routineView))
  })

  it('cannot get a routine from an invalid id', async () => {
    const viewsWithId = jest.spyOn(views, 'withId')
    const notValidId = 'invalidId'
    const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(notValidId)

    const response = (await getRoutineHandler.execute(
      GetRoutine.with({ id: notValidId }),
    )) as Left<InvalidUuid[]>

    expect(viewsWithId).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value[0].__name__).toBe(invalidUuid.__name__)
    expect(response.value[0].code).toBe(invalidUuid.code)
  })

  it('cannot get a routine that does not exist', async () => {
    const viewsWithId = jest.spyOn(views, 'withId')
    const notFoundRoutine = NotFoundRoutine.withId(id)

    viewsWithId.mockResolvedValue(Either.left(NotFoundRoutine.withId(id)))

    const response = (await getRoutineHandler.execute(
      GetRoutine.with({ id }),
    )) as Left<NotFoundRoutine[]>

    expect(viewsWithId).toHaveBeenCalledWith(id)
    expect(Either.isRight(response)).toBe(false)
    expect(response.value[0].__name__).toBe(notFoundRoutine.__name__)
    expect(response.value[0].code).toBe(notFoundRoutine.code)
  })
})
