import Exercises from '~/exercise/domain/services/exercises'
import EventStoreExercises from '~/exercise/infrastructure/services/eventstore-exercises'
import RoutineViews from '~/routine/application/services/views'
import Routines from '~/routine/domain/services/routines'

import EventStoreRoutines from './services/eventstore-routines'
import MongooseRoutineViews from './services/mongoose-views'

const routineProviders = [
  {
    provide: Exercises,
    useClass: EventStoreExercises,
  },
  {
    provide: Routines,
    useClass: EventStoreRoutines,
  },
  {
    provide: RoutineViews,
    useClass: MongooseRoutineViews,
  },
]

export default routineProviders
