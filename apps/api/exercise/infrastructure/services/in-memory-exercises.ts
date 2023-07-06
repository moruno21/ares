import { Injectable } from '@nestjs/common'

import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import Exercises from '~/exercise/domain/services/exercises'
import Either from '~/shared/either'

@Injectable()
class InMemoryExercises implements Exercises {
  private constructor(readonly exercises: Exercise[]) {}

  static withExercises(exercises: Exercise[]) {
    return new InMemoryExercises(exercises)
  }

  async add(exercise: Exercise): Promise<Exercise> {
    this.exercises.push(exercise)

    return exercise
  }

  async delete(exercise: Exercise): Promise<Exercise> {
    const index = this.exercises.indexOf(exercise)

    if (index !== -1) this.exercises.splice(index, 1)

    return exercise
  }

  async findWithId(
    exerciseId: ExerciseId,
  ): Promise<Either<NotFoundExercise, Exercise>> {
    const exercise = this.exercises.find((value) => value.id === exerciseId)

    if (!exercise) return Either.left(NotFoundExercise.withId(exerciseId.value))

    return Either.right(exercise)
  }
}

export default InMemoryExercises
