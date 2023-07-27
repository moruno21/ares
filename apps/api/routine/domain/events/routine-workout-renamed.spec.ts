import { itIsNamed } from '~/test/closures/shared/name-type'

import RoutineWorkoutRenamed from './routine-workout-renamed'

describe('RoutineWorkoutRenamed', () => {
  const __name__ = 'RoutineWorkoutRenamed'
  const id = 'id'
  const workout = { exerciseId: 'exerciseId', exerciseName: 'exerciseName' }
  const routineWorkoutRenamed = RoutineWorkoutRenamed.with({ id, workout })

  itIsNamed(routineWorkoutRenamed)

  it.concurrent('has an id', () => {
    expect(routineWorkoutRenamed).toHaveProperty('id')
  })

  it.concurrent('has a workout', () => {
    expect(routineWorkoutRenamed).toHaveProperty('workout')
  })

  it.concurrent('can be created', () => {
    expect(routineWorkoutRenamed.__name__).toBe(__name__)
    expect(routineWorkoutRenamed.id).toBe(id)
    expect(routineWorkoutRenamed.workout).toBe(workout)
  })
})
