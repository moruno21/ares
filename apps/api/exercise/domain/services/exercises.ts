import Either from '~/shared/either'

import NotFoundExercise from '../exceptions/not-found'
import Exercise from '../models/exercise'
import ExerciseId from '../models/id'

type Exercises = Readonly<{
  add(exercise: Exercise): Promise<Exercise>
  delete(exercise: Exercise): Promise<Exercise>
  findWithId(
    exerciseId: ExerciseId,
  ): Promise<Either<NotFoundExercise, Exercise>>
}>

const Exercises = 'Exercises' as const

export default Exercises
