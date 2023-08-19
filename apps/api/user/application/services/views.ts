import Either from '~/shared/either'
import NotFoundUser from '~/user/domain/exceptions/not-found'

import UserView from '../models/view'

type UserViews = Readonly<{
  add: (view: UserView) => Promise<UserView>
  getAll: () => Promise<UserView[]>
  withEmail: (email: string) => Promise<Either<NotFoundUser, UserView>>
  withId: (id: string) => Promise<Either<NotFoundUser, UserView>>
}>

const UserViews = 'UserViews' as const

export default UserViews
