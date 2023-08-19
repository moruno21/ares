import { InvalidUuid } from '~/shared/domain'
import Either, { Left } from '~/shared/either'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'
import UserViewsMock from '~/test/mocks/user/application/services/views'
import UserView from '~/user/application/models/view'
import UserViews from '~/user/application/services/views'
import NotFoundUser from '~/user/domain/exceptions/not-found'

import RoutineView from '../../models/view'
import RoutineViews from '../../services/views'
import GetRoutinesByOwnewId from '../get-routines-by-owner-id'
import GetRoutinesByOwnerIdHandler from './get-routines-by-owner-id'

describe('GetRoutinesByOwnerId', () => {
  let routineViews: RoutineViews
  let userViews: UserViews
  let getRoutinesByOwnerIdHandler: GetRoutinesByOwnerIdHandler

  const id = '97c0e83d-81bf-481e-9e4e-ba7451947f9d'
  const name = 'name'
  const description = 'description'
  const ownerId = '9adc3b2c-8bc0-448a-ac0d-9023a8ea031d'
  const workouts = [
    {
      exerciseId: 'exerciseId',
      exerciseName: 'exerciseName',
      reps: 6,
      sets: 4,
    },
  ]

  beforeEach(() => {
    routineViews = RoutineViewsMock.mock()
    userViews = UserViewsMock.mock()
    getRoutinesByOwnerIdHandler = new GetRoutinesByOwnerIdHandler(
      routineViews,
      userViews,
    )
  })

  it('gets all the routines that has this owner id', async () => {
    const routineViewsWithOwnerId = jest.spyOn(routineViews, 'withOwnerId')
    const userViewsWithId = jest.spyOn(userViews, 'withId')

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

    userViewsWithId.mockResolvedValue(
      Either.right(
        UserView.with({
          email: 'name@gmail.com',
          id: ownerId,
          name: 'name',
        }),
      ),
    )
    routineViewsWithOwnerId.mockResolvedValue([routineViewOne, routineViewTwo])

    const response = await getRoutinesByOwnerIdHandler.execute(
      GetRoutinesByOwnewId.with({ ownerId }),
    )

    expect(Either.isRight(response)).toBe(true)
    expect(routineViewsWithOwnerId).toHaveBeenCalled()
    expect(response).toStrictEqual(
      Either.right([routineViewOne, routineViewTwo]),
    )
  })

  it('returns empty value when there are no routines with this owner id', async () => {
    const routineViewsWithOwnerId = jest.spyOn(routineViews, 'withOwnerId')
    const userViewsWithId = jest.spyOn(userViews, 'withId')

    userViewsWithId.mockResolvedValue(
      Either.right(
        UserView.with({
          email: 'name@gmail.com',
          id: ownerId,
          name: 'name',
        }),
      ),
    )
    routineViewsWithOwnerId.mockResolvedValue([])

    const response = await getRoutinesByOwnerIdHandler.execute(
      GetRoutinesByOwnewId.with({ ownerId }),
    )

    expect(routineViewsWithOwnerId).toHaveBeenCalled()
    expect(response).toStrictEqual(Either.right([]))
  })

  it('cannot get routines from an invalid owner id', async () => {
    const routineViewsWithOwnerId = jest.spyOn(routineViews, 'withOwnerId')
    const userViewsWithId = jest.spyOn(userViews, 'withId')
    const notValidId = 'invalidId'
    const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(notValidId)

    const response = (await getRoutinesByOwnerIdHandler.execute(
      GetRoutinesByOwnewId.with({ ownerId: notValidId }),
    )) as Left<InvalidUuid[]>

    expect(userViewsWithId).not.toHaveBeenCalled()
    expect(routineViewsWithOwnerId).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value[0].__name__).toBe(invalidUuid.__name__)
    expect(response.value[0].code).toBe(invalidUuid.code)
  })

  it('cannot get routines from an owner id of a non existent user', async () => {
    const routineViewsWithOwnerId = jest.spyOn(routineViews, 'withOwnerId')
    const userViewsWithId = jest.spyOn(userViews, 'withId')
    const notFoundUser = NotFoundUser.withId(ownerId)

    userViewsWithId.mockResolvedValue(Either.left(notFoundUser))

    const response = (await getRoutinesByOwnerIdHandler.execute(
      GetRoutinesByOwnewId.with({ ownerId }),
    )) as Left<NotFoundUser[]>

    expect(userViewsWithId).toHaveBeenCalledWith(ownerId)
    expect(routineViewsWithOwnerId).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value[0].__name__).toBe(notFoundUser.__name__)
    expect(response.value[0].code).toBe(notFoundUser.code)
  })
})
