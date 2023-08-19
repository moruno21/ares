import { InvalidUuid } from '~/shared/domain'
import Either, { Left } from '~/shared/either'
import UserViewsMock from '~/test/mocks/user/application/services/views'
import NotFoundUser from '~/user/domain/exceptions/not-found'

import UserView from '../../models/view'
import UserViews from '../../services/views'
import GetUser from '../get-user'
import GetUserHandler from './get-user'

describe('GetUser', () => {
  let views: UserViews
  let getUserHandler: GetUserHandler

  const id = '949fb41c-de7b-4218-89bf-6252b7e0b03c'
  const name = 'name'
  const email = 'email'

  beforeEach(() => {
    views = UserViewsMock.mock()
    getUserHandler = new GetUserHandler(views)
  })

  it('gets an user from an id', async () => {
    const viewsWithId = jest.spyOn(views, 'withId')

    const userView = UserView.with({ email, id, name })

    viewsWithId.mockResolvedValue(Either.right(userView))

    const response = await getUserHandler.execute(GetUser.with({ id }))

    expect(viewsWithId).toHaveBeenCalledWith(id)
    expect(Either.isRight(response)).toBe(true)
    expect(response).toStrictEqual(Either.right(userView))
  })

  it('cannot get an user from an invalid id', async () => {
    const viewsWithId = jest.spyOn(views, 'withId')
    const notValidId = 'invalidId'
    const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(notValidId)

    const response = (await getUserHandler.execute(
      GetUser.with({ id: notValidId }),
    )) as Left<InvalidUuid[]>

    expect(viewsWithId).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value[0].__name__).toBe(invalidUuid.__name__)
    expect(response.value[0].code).toBe(invalidUuid.code)
  })

  it('cannot get an user that does not exist', async () => {
    const viewsWithId = jest.spyOn(views, 'withId')
    const notFoundUser = NotFoundUser.withId(id)

    viewsWithId.mockResolvedValue(Either.left(NotFoundUser.withId(id)))

    const response = (await getUserHandler.execute(
      GetUser.with({ id }),
    )) as Left<NotFoundUser[]>

    expect(viewsWithId).toHaveBeenCalledWith(id)
    expect(Either.isRight(response)).toBe(false)
    expect(response.value[0].__name__).toBe(notFoundUser.__name__)
    expect(response.value[0].code).toBe(notFoundUser.code)
  })
})
