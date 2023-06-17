import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

class PostExerciseDto {
  @ApiProperty()
  @IsString()
  readonly description: string

  @ApiProperty()
  @IsString()
  readonly name: string
}

export default PostExerciseDto
