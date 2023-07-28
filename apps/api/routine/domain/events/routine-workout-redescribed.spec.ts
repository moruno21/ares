import { itIsNamed } from '~/test/closures/shared/name-type'

import RoutineWorkoutRedescribed from './routine-workout-redescribed'

describe('RoutineWorkoutRedescribed', () => {
  const __name__ = 'RoutineWorkoutRedescribed'
  const id = 'id'
  const workout = {
    exerciseDescription: 'exerciseDescription',
    exerciseId: 'exerciseId',
  }
  const routineWorkoutRedescribed = RoutineWorkoutRedescribed.with({
    id,
    workout,
  })

  itIsNamed(routineWorkoutRedescribed)

  it.concurrent('has an id', () => {
    expect(routineWorkoutRedescribed).toHaveProperty('id')
  })

  it.concurrent('has a workout', () => {
    expect(routineWorkoutRedescribed).toHaveProperty('workout')
  })

  it.concurrent('can be created', () => {
    expect(routineWorkoutRedescribed.__name__).toBe(__name__)
    expect(routineWorkoutRedescribed.id).toBe(id)
    expect(routineWorkoutRedescribed.workout).toBe(workout)
  })
})
