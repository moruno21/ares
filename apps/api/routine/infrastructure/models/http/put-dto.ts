import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsString, ValidateNested } from 'class-validator'

class PutRoutineWorkoutDto {
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

class PutRoutineDto {
  @ApiProperty()
  @IsString()
  readonly description: string

  @ApiProperty()
  @IsString()
  readonly name: string

  @ApiProperty({ type: [PutRoutineWorkoutDto] })
  @Type(() => PutRoutineWorkoutDto)
  @ValidateNested()
  readonly workouts: PutRoutineWorkoutDto[]

  private constructor(
    description: PutRoutineDto['description'],
    name: PutRoutineDto['name'],
    workouts: PutRoutineDto['workouts'],
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
    workouts: PutRoutineDto['workouts']
  }): PutRoutineDto {
    return new PutRoutineDto(description, name, workouts)
  }
}

export default PutRoutineDto
