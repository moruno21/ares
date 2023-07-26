import ExerciseViews from '~/exercise/application/services/views'
import Exercises from '~/exercise/domain/services/exercises'
import RoutineViews from '~/routine/application/services/views'
import MongooseRoutineViews from '~/routine/infrastructure/services/mongoose-views'

import EventStoreExercises from './services/eventstore-exercises'
import MongooseExerciseViews from './services/mongoose-views'

const exerciseProviders = [
  {
    provide: Exercises,
    useClass: EventStoreExercises,
  },
  {
    provide: ExerciseViews,
    useClass: MongooseExerciseViews,
  },
  {
    provide: RoutineViews,
    useClass: MongooseRoutineViews,
  },
]

export default exerciseProviders
