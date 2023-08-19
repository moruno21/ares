import Either, { Left } from '~/shared/either'
import UserViewsMock from '~/test/mocks/user/application/services/views'
import NotFoundUser from '~/user/domain/exceptions/not-found'

import UserView from '../../models/view'
import UserViews from '../../services/views'
import GetUserByEmail from '../get-user-by-email'
import GetUserByEmailHandler from './get-user-by-email'

describe('GetUserByEmail', () => {
  let views: UserViews
  let getUserByEmailHandler: GetUserByEmailHandler

  const id = '84fbc9ea-2da4-44bd-91ec-e7c134a944be'
  const email = 'name@gmail.com'
  const name = 'name'

  beforeEach(() => {
    views = UserViewsMock.mock()
    getUserByEmailHandler = new GetUserByEmailHandler(views)
  })

  it('gets an user from an email', async () => {
    const viewsWithEmail = jest.spyOn(views, 'withEmail')

    const userView = UserView.with({ email, id, name })

    viewsWithEmail.mockResolvedValue(Either.right(userView))

    const response = await getUserByEmailHandler.execute(
      GetUserByEmail.with({ email }),
    )

    expect(viewsWithEmail).toHaveBeenCalledWith(email)
    expect(Either.isRight(response)).toBe(true)
    expect(response).toStrictEqual(Either.right(userView))
  })

  it('cannot get an user that does not exist', async () => {
    const viewsWithEmail = jest.spyOn(views, 'withEmail')
    const notFoundUser = NotFoundUser.withEmail(email)

    viewsWithEmail.mockResolvedValue(Either.left(NotFoundUser.withEmail(email)))

    const response = (await getUserByEmailHandler.execute(
      GetUserByEmail.with({ email }),
    )) as Left<NotFoundUser[]>

    expect(viewsWithEmail).toHaveBeenCalledWith(email)
    expect(Either.isRight(response)).toBe(false)
    expect(response.value[0].__name__).toBe(notFoundUser.__name__)
    expect(response.value[0].code).toBe(notFoundUser.code)
  })
})
