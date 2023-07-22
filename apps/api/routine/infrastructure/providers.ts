import RoutineViews from '~/routine/application/services/views'
import Routines from '~/routine/domain/services/routines'

import EventStoreRoutines from './services/eventstore-routines'
import MongooseRoutineViews from './services/mongoose-views'

const routineProviders = [
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
