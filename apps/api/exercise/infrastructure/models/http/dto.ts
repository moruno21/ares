import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import ExerciseView from '~/exercise/application/models/view'
import Exercise from '~/exercise/domain/models/exercise'

class ExerciseDto {
  @ApiProperty()
  @IsString()
  readonly id: string

  @ApiProperty()
  @IsString()
  readonly description: string

  @ApiProperty()
  @IsString()
  readonly name: string

  private constructor(
    id: ExerciseDto['id'],
    description: ExerciseDto['description'],
    name: ExerciseDto['name'],
  ) {
    this.id = id
    this.name = name
    this.description = description
  }

  static fromExercise({ description, id, name }: Exercise): ExerciseDto {
    return new this(id.value, description.value, name.value)
  }

  static fromExerciseView({
    description,
    id,
    name,
  }: ExerciseView): ExerciseDto {
    return new this(id, description, name)
  }
}

export default ExerciseDto
