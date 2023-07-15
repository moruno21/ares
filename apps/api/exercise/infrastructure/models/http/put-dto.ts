import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

class PutExerciseDto {
  @ApiProperty()
  @IsString()
  readonly description: string

  @ApiProperty()
  @IsString()
  readonly name: string

  private constructor(description: string, name: string) {
    this.description = description
    this.name = name
  }

  static with({
    description,
    name,
  }: {
    description: string
    name: string
  }): PutExerciseDto {
    return new PutExerciseDto(description, name)
  }
}

export default PutExerciseDto
