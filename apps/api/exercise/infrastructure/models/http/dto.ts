import { ApiProperty } from '@nestjs/swagger'

import ExerciseView from '~/exercise/application/models/view'
import Exercise from '~/exercise/domain/models/exercise'

class ExerciseDto {
  @ApiProperty()
  readonly id: string

  @ApiProperty()
  readonly description: string

  @ApiProperty()
  readonly name: string

  private constructor(id: string, description: string, name: string) {
    this.id = id
    this.name = name
    this.description = description
  }

  static fromExercise(exercise: Exercise): ExerciseDto {
    return new this(
      exercise.id.value,
      exercise.description.value,
      exercise.name.value,
    )
  }

  static fromExerciseView(exerciseView: ExerciseView): ExerciseDto {
    return new this(
      exerciseView.id,
      exerciseView.description,
      exerciseView.name,
    )
  }
}

export default ExerciseDto
