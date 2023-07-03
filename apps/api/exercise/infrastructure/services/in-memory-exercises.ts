import { Injectable } from '@nestjs/common'

import Exercise from '~/exercise/domain/models/exercise'
import Exercises from '~/exercise/domain/services/exercises'

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
}

export default InMemoryExercises
