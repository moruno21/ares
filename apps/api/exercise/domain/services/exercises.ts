import Either from '~/shared/either'

import NotFoundExercise from '../exceptions/not-found'
import Exercise from '../models/exercise'
import ExerciseId from '../models/id'

type Exercises = Readonly<{
  save(exercise: Exercise): Exercise
  withId(exerciseId: ExerciseId): Promise<Either<NotFoundExercise, Exercise>>
}>

const Exercises = 'Exercises' as const

export default Exercises
