import RoutineViewsMock from '~/test/mocks/routine/application/services/views'

import RoutineView from '../../models/view'
import RoutineViews from '../../services/views'
import GetRoutinesHandler from './get-routines'

describe('GetRoutines', () => {
  let views: RoutineViews
  let getRoutinesHandler: GetRoutinesHandler

  const id = '97c0e83d-81bf-481e-9e4e-ba7451947f9d'
  const name = 'name'
  const description = 'description'
  const ownerId = 'ownerId'
  const workouts = [
    {
      exerciseId: 'exerciseId',
      exerciseName: 'exerciseName',
      reps: 6,
      sets: 4,
    },
  ]

  beforeEach(() => {
    views = RoutineViewsMock.mock()
    getRoutinesHandler = new GetRoutinesHandler(views)
  })

  it('gets all the routines', async () => {
    const viewsGetAll = jest.spyOn(views, 'getAll')

    const routineViewOne = RoutineView.with({
      description,
      id,
      name,
      ownerId,
      workouts,
    })
    const routineViewTwo = RoutineView.with({
      description,
      id,
      name,
      ownerId,
      workouts,
    })

    viewsGetAll.mockResolvedValue([routineViewOne, routineViewTwo])

    const response = await getRoutinesHandler.execute()

    expect(viewsGetAll).toHaveBeenCalled()
    expect(response).toStrictEqual([routineViewOne, routineViewTwo])
  })

  it('returns empty value when there are no routines', async () => {
    const viewsGetAll = jest.spyOn(views, 'getAll')

    viewsGetAll.mockResolvedValue([])

    const response = await getRoutinesHandler.execute()

    expect(viewsGetAll).toHaveBeenCalled()
    expect(response).toStrictEqual([])
  })
})
