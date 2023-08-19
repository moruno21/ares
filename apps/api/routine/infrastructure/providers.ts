import ExerciseViews from '~/exercise/application/services/views'
import Exercises from '~/exercise/domain/services/exercises'
import EventStoreExercises from '~/exercise/infrastructure/services/eventstore-exercises'
import MongooseExerciseViews from '~/exercise/infrastructure/services/mongoose-views'
import RoutineViews from '~/routine/application/services/views'
import Routines from '~/routine/domain/services/routines'
import UserViews from '~/user/application/services/views'
import Users from '~/user/domain/services/users'
import EventStoreUsers from '~/user/infrastructure/services/eventstore-users'
import MongooseUserViews from '~/user/infrastructure/services/mongoose-views'

import EventStoreRoutines from './services/eventstore-routines'
import MongooseRoutineViews from './services/mongoose-views'

const routineProviders = [
  {
    provide: Exercises,
    useClass: EventStoreExercises,
  },
  {
    provide: ExerciseViews,
    useClass: MongooseExerciseViews,
  },
  {
    provide: Routines,
    useClass: EventStoreRoutines,
  },
  {
    provide: RoutineViews,
    useClass: MongooseRoutineViews,
  },
  {
    provide: Users,
    useClass: EventStoreUsers,
  },
  {
    provide: UserViews,
    useClass: MongooseUserViews,
  },
]

export default routineProviders
