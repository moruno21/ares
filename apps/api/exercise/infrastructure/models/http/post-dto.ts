import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

class PostExerciseDto {
  @ApiProperty()
  @IsString()
  readonly name: string
}

export default PostExerciseDto
