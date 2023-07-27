import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsString, ValidateNested } from 'class-validator'

import RoutineView from '~/routine/application/models/view'
import Routine from '~/routine/domain/models/routine'

class RoutineWorkoutDto {
  @ApiProperty()
  @IsString()
  readonly exerciseId: string

  @ApiProperty()
  @IsString()
  readonly exerciseName?: string

  @ApiProperty()
  @IsInt()
  readonly reps: number

  @ApiProperty()
  @IsInt()
  readonly sets: number
}

class RoutineDto {
  @ApiProperty()
  @IsString()
  readonly id: string

  @ApiProperty()
  @IsString()
  readonly description: string

  @ApiProperty()
  @IsString()
  readonly name: string

  @ApiProperty({ type: [RoutineWorkoutDto] })
  @Type(() => RoutineWorkoutDto)
  @ValidateNested()
  readonly workouts: RoutineWorkoutDto[]

  private constructor(
    id: RoutineDto['id'],
    description: RoutineDto['description'],
    name: RoutineDto['name'],
    workouts: RoutineDto['workouts'],
  ) {
    this.id = id
    this.description = description
    this.name = name
    this.workouts = workouts
  }

  static fromRoutine({ description, id, name, workouts }: Routine): RoutineDto {
    return new this(
      id.value,
      description.value,
      name.value,
      workouts.map((workout) => workout.value),
    )
  }

  static fromRoutineView({
    description,
    id,
    name,
    workouts,
  }: RoutineView): RoutineDto {
    return new this(id, description, name, workouts)
  }
}

export default RoutineDto
