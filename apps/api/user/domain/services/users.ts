import Either from '~/shared/either'

import NotFoundUser from '../exceptions/not-found'
import UserId from '../models/id'
import User from '../models/user'

type Users = Readonly<{
  save(user: User): User
  withId(userId: UserId): Promise<Either<NotFoundUser, User>>
}>

const Users = 'Users' as const

export default Users
