import ExerciseId from '~/exercise/domain/models/id'
import WorkoutId from '~/workout/domain/models/id'
import WorkoutReps from '~/workout/domain/models/reps'
import WorkoutSets from '~/workout/domain/models/sets'
import Workout from '~/workout/domain/models/workout'

import WorkoutDto from './dto'

describe('WorkoutDto', () => {
  const idValue = 'da4672dc-7398-4212-89c7-34bdae6ceb2d'
  const id = WorkoutId.fromString(idValue).value as WorkoutId
  const exerciseIdValue = '72a37bed-19ae-49ff-87ca-1891f98e86a4'
  const exerciseId = ExerciseId.fromString(exerciseIdValue).value as ExerciseId
  const repsValue = 8
  const reps = WorkoutReps.fromNumber(repsValue).value as WorkoutReps
  const setsValue = 4
  const sets = WorkoutSets.fromNumber(setsValue).value as WorkoutSets
  const dto = WorkoutDto.fromWorkout(
    Workout.create({ exerciseId, id, reps, sets }),
  )

  it.concurrent('has an id', () => {
    expect(dto).toHaveProperty('id')
  })

  it.concurrent('has an exercise id', () => {
    expect(dto).toHaveProperty('exerciseId')
  })

  it.concurrent('has reps', () => {
    expect(dto).toHaveProperty('reps')
  })

  it.concurrent('has sets', () => {
    expect(dto).toHaveProperty('sets')
  })

  it.concurrent('can be created from workout', () => {
    expect(dto.id).toBe(idValue)
    expect(dto.exerciseId).toBe(exerciseIdValue)
    expect(dto.reps).toBe(repsValue)
    expect(dto.sets).toBe(setsValue)
  })
})
