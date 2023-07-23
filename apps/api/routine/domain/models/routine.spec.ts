import { itIsAnEntity } from '~/test/closures/shared/domain/entity'

import RoutineDescription from './description'
import RoutineId from './id'
import RoutineName from './name'
import Routine from './routine'
import RoutineWorkout from './workout'

describe('Routine', () => {
  const __name__ = 'Routine'
  const id = RoutineId.fromString('2869190a-20fc-46af-9b28-f8f65f72a985')
    .value as RoutineId
  const name = RoutineName.fromString('squats').value as RoutineName
  const description = RoutineDescription.fromString('description')
    .value as RoutineDescription
  const workoutsValue = [
    {
      exerciseId: 'ea29a364-177c-4751-bb3b-43bed8cb58e5',
      reps: 4,
      sets: 4,
    },
  ]
  const workouts = workoutsValue.map(
    (workoutValue) =>
      RoutineWorkout.fromValue(workoutValue).value as RoutineWorkout,
  )
  const routine = Routine.create({ description, id, name, workouts })

  itIsAnEntity(routine)

  it.concurrent('has a name', () => {
    expect(routine).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(routine).toHaveProperty('description')
  })

  it.concurrent('has workouts', () => {
    expect(routine).toHaveProperty('workouts')
  })

  it.concurrent('has an isdeleted', () => {
    expect(routine).toHaveProperty('isDeleted')
  })

  it.concurrent('can be created', () => {
    expect(routine.__name__).toBe(__name__)
    expect(routine.id).toStrictEqual(id)
    expect(routine.name).toStrictEqual(name)
    expect(routine.description).toStrictEqual(description)
    expect(routine.workouts).toStrictEqual(workouts)
    expect(routine.isDeleted).toBe(false)
  })
})
