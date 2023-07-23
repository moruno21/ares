import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

class PostExerciseDto {
  @ApiProperty()
  @IsString()
  readonly description: string

  @ApiProperty()
  @IsString()
  readonly name: string

  private constructor(
    description: PostExerciseDto['description'],
    name: PostExerciseDto['name'],
  ) {
    this.description = description
    this.name = name
  }

  static with({
    description,
    name,
  }: {
    description: string
    name: string
  }): PostExerciseDto {
    return new PostExerciseDto(description, name)
  }
}

export default PostExerciseDto
