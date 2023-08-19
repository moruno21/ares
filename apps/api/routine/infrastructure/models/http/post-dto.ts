import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsString, ValidateNested } from 'class-validator'

class PostRoutineWorkoutDto {
  @ApiProperty()
  @IsString()
  readonly exerciseId: string

  @ApiProperty()
  @IsInt()
  readonly reps: number

  @ApiProperty()
  @IsInt()
  readonly sets: number
}

class PostRoutineDto {
  @ApiProperty()
  @IsString()
  readonly description: string

  @ApiProperty()
  @IsString()
  readonly name: string

  @ApiProperty({ type: [PostRoutineWorkoutDto] })
  @Type(() => PostRoutineWorkoutDto)
  @ValidateNested()
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
