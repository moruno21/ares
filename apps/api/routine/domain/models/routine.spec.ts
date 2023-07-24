import Either, { Left } from '~/shared/either'
import { itIsAnEntity } from '~/test/closures/shared/domain/entity'

import NotFoundRoutine from '../exceptions/not-found'
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

  it.concurrent('can be deleted', () => {
    const deletedRoutine = routine.delete()

    expect(deletedRoutine.value).toStrictEqual(routine)
    expect(routine.isDeleted).toBe(true)
  })

  it.concurrent('cannot be deleted if it is already deleted', () => {
    routine.delete()
    const deletedRoutineTwice = routine.delete() as Left<NotFoundRoutine>
    const notFoundRoutine = NotFoundRoutine.withId(routine.id.value)

    expect(Either.isRight(deletedRoutineTwice)).toBe(false)
    expect(deletedRoutineTwice.value.__name__).toBe(notFoundRoutine.__name__)
    expect(deletedRoutineTwice.value.code).toBe(notFoundRoutine.code)
  })

  it.concurrent('can be renamed', () => {
    const newName = RoutineName.fromString('bench press').value as RoutineName
    routine.rename(newName)

    expect(routine.name).toStrictEqual(newName)
  })

  it.concurrent('can be redescribed', () => {
    const newDescription = RoutineDescription.fromString('new description')
      .value as RoutineDescription
    routine.redescribe(newDescription)

    expect(routine.description).toStrictEqual(newDescription)
  })

  it.concurrent('can have its workouts changed', () => {
    const newWorkoutsValue = [
      {
        exerciseId: 'ec939e32-9572-4280-a753-22ff15f1ce7a',
        reps: 8,
        sets: 5,
      },
      {
        exerciseId: '5c617d34-b6d2-4c2e-9bf6-31a7d44c8678',
        reps: 10,
        sets: 4,
      },
    ]
    const newWorkouts = newWorkoutsValue.map(
      (newWorkoutValue) =>
        RoutineWorkout.fromValue(newWorkoutValue).value as RoutineWorkout,
    )

    routine.changeWorkouts(newWorkouts)

    expect(routine.workouts).toStrictEqual(newWorkouts)
  })
})
