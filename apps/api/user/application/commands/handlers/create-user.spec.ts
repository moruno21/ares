import Either, { Left } from '~/shared/either'
import UserViewsMock from '~/test/mocks/user/application/services/views'
import UsersMock from '~/test/mocks/user/domain/services/users'
import NotCreatedUser from '~/user/domain/exceptions/not-created'
import NotFoundUser from '~/user/domain/exceptions/not-found'
import UserEmail from '~/user/domain/models/email'
import UserId from '~/user/domain/models/id'
import UserName from '~/user/domain/models/name'
import User from '~/user/domain/models/user'
import Users from '~/user/domain/services/users'

import UserView from '../../models/view'
import UserViews from '../../services/views'
import CreateUser from '../create-user'
import CreateUserHandler from './create-user'

describe('CreateUserHandler', () => {
  let users: Users
  let views: UserViews
  let createUserHandler: CreateUserHandler

  const idValue = 'c6535b7a-9d0b-4bec-9515-f1656761f80d'
  const id = UserId.fromString(idValue).value as UserId
  const emailValue = 'name@gmail.com'
  const email = UserEmail.fromString(emailValue)
  const nameValue = 'name'
  const name = UserName.fromString(nameValue)

  const user = User.create({ email, id, name })

  beforeEach(() => {
    users = UsersMock.mock()
    views = UserViewsMock.mock()
    createUserHandler = new CreateUserHandler(users, views)
  })

  it('creates an user', async () => {
    const usersSave = jest.spyOn(users, 'save')
    const viewsWithEmail = jest.spyOn(views, 'withEmail')

    viewsWithEmail.mockResolvedValue(
      Either.left(NotFoundUser.withEmail(emailValue)),
    )

    const response = await createUserHandler.execute(
      CreateUser.with({
        email: emailValue,
        id: idValue,
      }),
    )

    expect(viewsWithEmail).toHaveBeenCalledWith(emailValue)
    expect(usersSave).toHaveBeenCalledWith(user)
    expect(Either.isRight(response)).toBe(true)
    expect(response).toStrictEqual(Either.right(user))
  })

  it('cannot create an user whose email is already used by another user', async () => {
    const usersSave = jest.spyOn(users, 'save')
    const viewsWithEmail = jest.spyOn(views, 'withEmail')
    const notCreated = NotCreatedUser.causeAlreadyExistsOneWithEmail(emailValue)

    viewsWithEmail.mockResolvedValue(
      Either.right(
        UserView.with({
          email: emailValue,
          id: idValue,
          name: emailValue,
        }),
      ),
    )

    const response = (await createUserHandler.execute(
      CreateUser.with({
        email: emailValue,
        id: idValue,
      }),
    )) as Left<NotCreatedUser[]>

    expect(viewsWithEmail).toHaveBeenCalledWith(emailValue)
    expect(usersSave).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value[0].__name__).toBe(notCreated.__name__)
    expect(response.value[0].code).toBe(notCreated.code)
  })
})
