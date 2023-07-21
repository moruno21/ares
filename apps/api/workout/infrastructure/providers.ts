import Exercises from '~/exercise/domain/services/exercises'
import EventStoreExercises from '~/exercise/infrastructure/services/eventstore-exercises'

import WorkoutViews from '../application/services/views'
import Workouts from '../domain/services/workouts'
import EventStoreWorkouts from './services/eventstore-workouts'
import MongooseWorkoutViews from './services/mongoose-views'

const workoutProviders = [
  {
    provide: Exercises,
    useClass: EventStoreExercises,
  },
  {
    provide: Workouts,
    useClass: EventStoreWorkouts,
  },
  {
    provide: WorkoutViews,
    useClass: MongooseWorkoutViews,
  },
]

export default workoutProviders
