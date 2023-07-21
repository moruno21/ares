import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

class PostWorkoutDto {
  @ApiProperty()
  @IsString()
  readonly exerciseId: string

  @ApiProperty()
  readonly reps: number

  @ApiProperty()
  readonly sets: number

  private constructor(exerciseId: string, reps: number, sets: number) {
    this.exerciseId = exerciseId
    this.reps = reps
    this.sets = sets
  }

  static with({
    exerciseId,
    reps,
    sets,
  }: {
    exerciseId: string
    reps: number
    sets: number
  }): PostWorkoutDto {
    return new PostWorkoutDto(exerciseId, reps, sets)
  }
}

export default PostWorkoutDto
