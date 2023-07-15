import Either from '~/shared/either'

import NotFoundExercise from '../exceptions/not-found'
import Exercise from '../models/exercise'
import ExerciseId from '../models/id'

type Exercises = Readonly<{
  findWithId(
    exerciseId: ExerciseId,
  ): Promise<Either<NotFoundExercise, Exercise>>
  save(exercise: Exercise): Exercise
}>

const Exercises = 'Exercises' as const

export default Exercises
