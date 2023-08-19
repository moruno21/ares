import UserViews from '~/user/application/services/views'
import Users from '~/user/domain/services/users'
import EventStoreUsers from '~/user/infrastructure/services/eventstore-users'
import MongooseUserViews from '~/user/infrastructure/services/mongoose-views'

const userProviders = [
  {
    provide: Users,
    useClass: EventStoreUsers,
  },
  {
    provide: UserViews,
    useClass: MongooseUserViews,
  },
]

export default userProviders
