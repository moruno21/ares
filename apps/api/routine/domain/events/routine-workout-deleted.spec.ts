import { itIsNamed } from '~/test/closures/shared/name-type'

import RoutineWorkoutDeleted from './routine-workout-deleted'

describe('RoutineWorkoutDeleted', () => {
  const __name__ = 'RoutineWorkoutDeleted'
  const id = 'id'
  const workout = { exerciseId: 'exerciseId', reps: 4, sets: 4 }
  const routineWorkoutDeleted = RoutineWorkoutDeleted.with({ id, workout })

  itIsNamed(routineWorkoutDeleted)

  it.concurrent('has an id', () => {
    expect(routineWorkoutDeleted).toHaveProperty('id')
  })

  it.concurrent('has a workout', () => {
    expect(routineWorkoutDeleted).toHaveProperty('workout')
  })

  it.concurrent('can be created', () => {
    expect(routineWorkoutDeleted.__name__).toBe(__name__)
    expect(routineWorkoutDeleted.id).toBe(id)
    expect(routineWorkoutDeleted.workout).toBe(workout)
  })
})
