import UserViewsMock from '~/test/mocks/user/application/services/views'

import UserView from '../../models/view'
import UserViews from '../../services/views'
import GetUsersHandler from './get-users'

describe('GetUsers', () => {
  let views: UserViews
  let getUsersHandler: GetUsersHandler

  const id = '28649ed6-d0bc-45d6-aa78-c0d1c67b23df'
  const email = 'email'
  const name = 'name'

  beforeEach(() => {
    views = UserViewsMock.mock()
    getUsersHandler = new GetUsersHandler(views)
  })

  it('gets all the users', async () => {
    const viewsGetAll = jest.spyOn(views, 'getAll')

    const userViewOne = UserView.with({
      email,
      id,
      name,
    })
    const userViewTwo = UserView.with({
      email,
      id,
      name,
    })

    viewsGetAll.mockResolvedValue([userViewOne, userViewTwo])

    const response = await getUsersHandler.execute()

    expect(viewsGetAll).toHaveBeenCalled()
    expect(response).toStrictEqual([userViewOne, userViewTwo])
  })

  it('returns empty value when there are no users', async () => {
    const viewsGetAll = jest.spyOn(views, 'getAll')

    viewsGetAll.mockResolvedValue([])

    const response = await getUsersHandler.execute()

    expect(viewsGetAll).toHaveBeenCalled()
    expect(response).toStrictEqual([])
  })
})
