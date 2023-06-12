import ExerciseViews from '~/exercise/application/services/views'
import Exercises from '~/exercise/domain/services/exercises'

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
]

export default exerciseProviders
