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

  @ApiProperty()
  @IsString()
  readonly ownerId: string

  @ApiProperty({ type: [PutRoutineWorkoutDto] })
  @Type(() => PutRoutineWorkoutDto)
  @ValidateNested()
  readonly workouts: PutRoutineWorkoutDto[]

  private constructor(
    description: PutRoutineDto['description'],
    name: PutRoutineDto['name'],
    ownerId: PutRoutineDto['ownerId'],
    workouts: PutRoutineDto['workouts'],
  ) {
    this.description = description
    this.name = name
    this.ownerId = ownerId
    this.workouts = workouts
  }

  static with({
    description,
    name,
    ownerId,
    workouts,
  }: {
    description: string
    name: string
    ownerId: string
    workouts: PutRoutineDto['workouts']
  }): PutRoutineDto {
    return new PutRoutineDto(description, name, ownerId, workouts)
  }
}

export default PutRoutineDto
