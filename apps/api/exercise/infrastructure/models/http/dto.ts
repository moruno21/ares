import { ApiProperty } from '@nestjs/swagger'

import Exercise from '~/exercise/domain/models/exercise'

class ExerciseDto {
  @ApiProperty()
  readonly id: string

  @ApiProperty()
  readonly name: string

  private constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }

  static fromExercise(exercise: Exercise): ExerciseDto {
    return new this(exercise.id.value, exercise.name.value)
  }
}

export default ExerciseDto
