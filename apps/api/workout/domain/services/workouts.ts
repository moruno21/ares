import Workout from '../models/workout'

type Workouts = Readonly<{
  save(workout: Workout): Workout
}>

const Workouts = 'Workouts' as const

export default Workouts
