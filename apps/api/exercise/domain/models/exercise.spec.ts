import Either, { Left } from '~/shared/either'
import { itIsAnEntity } from '~/test/closures/shared/domain/entity'

import NotFoundExercise from '../exceptions/not-found'
import ExerciseDescription from './description'
import Exercise from './exercise'
import ExerciseId from './id'
import ExerciseName from './name'

describe('Exercise', () => {
  const __name__ = 'Exercise'
  const id = ExerciseId.fromString('b60364f5-2816-407a-aa31-ffca1e5433a6')
    .value as ExerciseId
  const name = ExerciseName.fromString('squats').value as ExerciseName
  const description = ExerciseDescription.fromString('description')
    .value as ExerciseDescription
  const exercise = Exercise.create({ description, id, name })

  itIsAnEntity(exercise)

  it.concurrent('has a name', () => {
    expect(exercise).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(exercise).toHaveProperty('description')
  })

  it.concurrent('has an isdeleted', () => {
    expect(exercise).toHaveProperty('isDeleted')
  })

  it.concurrent('can be created', () => {
    expect(exercise.__name__).toBe(__name__)
    expect(exercise.id).toStrictEqual(id)
    expect(exercise.name).toStrictEqual(name)
    expect(exercise.description).toStrictEqual(description)
    expect(exercise.isDeleted).toBe(false)
  })

  it.concurrent('can be deleted', () => {
    const deletedExercise = exercise.delete()

    expect(deletedExercise.value).toStrictEqual(exercise)
    expect(exercise.isDeleted).toBe(true)
  })

  it.concurrent('cannot be deleted if it is already deleted', () => {
    exercise.delete()
    const deletedExerciseTwice = exercise.delete() as Left<NotFoundExercise>
    const notFoundExercise = NotFoundExercise.withId(exercise.id.value)

    expect(Either.isRight(deletedExerciseTwice)).toBe(false)
    expect(deletedExerciseTwice.value.__name__).toBe(notFoundExercise.__name__)
    expect(deletedExerciseTwice.value.code).toBe(notFoundExercise.code)
  })

  it.concurrent('can be renamed', () => {
    const newName = ExerciseName.fromString('bench press').value as ExerciseName
    exercise.rename(newName)

    expect(exercise.name).toStrictEqual(newName)
  })

  it.concurrent('can be redescribed', () => {
    const newDescription = ExerciseDescription.fromString('new description')
      .value as ExerciseDescription
    exercise.redescribe(newDescription)

    expect(exercise.description).toStrictEqual(newDescription)
  })
})
