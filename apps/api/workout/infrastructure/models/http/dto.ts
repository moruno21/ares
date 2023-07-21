import { ApiProperty } from '@nestjs/swagger'

import Workout from '~/workout/domain/models/workout'

class WorkoutDto {
  @ApiProperty()
  readonly id: string

  @ApiProperty()
  readonly exerciseId: string

  @ApiProperty()
  readonly reps: number

  @ApiProperty()
  readonly sets: number

  private constructor(
    id: string,
    exerciseId: string,
    reps: number,
    sets: number,
  ) {
    this.id = id
    this.exerciseId = exerciseId
    this.reps = reps
    this.sets = sets
  }

  static fromWorkout({ exerciseId, id, reps, sets }: Workout): WorkoutDto {
    return new this(id.value, exerciseId.value, reps.value, sets.value)
  }
}

export default WorkoutDto
