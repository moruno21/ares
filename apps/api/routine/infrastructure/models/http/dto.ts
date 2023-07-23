import { ApiProperty } from '@nestjs/swagger'

import RoutineView from '~/routine/application/models/view'
import Routine from '~/routine/domain/models/routine'

class RoutineWorkoutDto {
  @ApiProperty()
  readonly exerciseId: string

  @ApiProperty()
  readonly reps: number

  @ApiProperty()
  readonly sets: number
}

class RoutineDto {
  @ApiProperty()
  readonly id: string

  @ApiProperty()
  readonly description: string

  @ApiProperty()
  readonly name: string

  @ApiProperty({
    type: [RoutineWorkoutDto],
  })
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
