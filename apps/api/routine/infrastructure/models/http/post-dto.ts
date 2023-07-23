import { ApiProperty } from '@nestjs/swagger'

class PostRoutineWorkoutDto {
  @ApiProperty()
  readonly exerciseId: string

  @ApiProperty()
  readonly reps: number

  @ApiProperty()
  readonly sets: number
}
class PostRoutineDto {
  @ApiProperty()
  readonly description: string

  @ApiProperty()
  readonly name: string

  @ApiProperty({ type: [PostRoutineWorkoutDto] })
  readonly workouts: PostRoutineWorkoutDto[]

  private constructor(
    description: PostRoutineDto['description'],
    name: PostRoutineDto['name'],
    workouts: PostRoutineDto['workouts'],
  ) {
    this.description = description
    this.name = name
    this.workouts = workouts
  }

  static with({
    description,
    name,
    workouts,
  }: {
    description: string
    name: string
    workouts: PostRoutineDto['workouts']
  }): PostRoutineDto {
    return new PostRoutineDto(description, name, workouts)
  }
}

export default PostRoutineDto
