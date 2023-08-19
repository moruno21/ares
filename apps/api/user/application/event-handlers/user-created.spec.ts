import UserViewsMock from '~/test/mocks/user/application/services/views'
import UserCreated from '~/user/domain/events/user-created'

import UserView from '../models/view'
import UserViews from '../services/views'
import UserCreatedHandler from './user-created'

describe('UserCreatedHandler', () => {
  let views: UserViews
  let createdHandler: UserCreatedHandler

  beforeEach(() => {
    views = UserViewsMock.mock()
    createdHandler = new UserCreatedHandler(views)
  })

  it('creates an user view with user created', async () => {
    const id = 'id'
    const email = 'name@gmail.com'
    const name = 'name'
    const viewsAdd = jest.spyOn(views, 'add')

    await createdHandler.handle(UserCreated.with({ email, id, name }))

    expect(viewsAdd).toHaveBeenCalledWith(UserView.with({ email, id, name }))
  })
})
