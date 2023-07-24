import { itIsNamed } from '~/test/closures/shared/name-type'

import RoutineWorkoutsChanged from './routine-workouts-changed'

describe('RoutineWorkoutsChanged', () => {
  const __name__ = 'RoutineWorkoutsChanged'
  const id = 'id'
  const workouts = [{ exerciseId: 'exerciseId', reps: 6, sets: 4 }]
  const routineWorkoutsChanged = RoutineWorkoutsChanged.with({ id, workouts })

  itIsNamed(routineWorkoutsChanged)

  it.concurrent('has an id', () => {
    expect(routineWorkoutsChanged).toHaveProperty('id')
  })

  it.concurrent('has a workouts', () => {
    expect(routineWorkoutsChanged).toHaveProperty('workouts')
  })

  it.concurrent('can be created', () => {
    expect(routineWorkoutsChanged.__name__).toBe(__name__)
    expect(routineWorkoutsChanged.id).toBe(id)
    expect(routineWorkoutsChanged.workouts).toBe(workouts)
  })
})
