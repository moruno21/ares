import { itIsAnEntity } from '~/test/closures/shared/domain/entity'

import Exercise from '../models/exercise'
import ExerciseId from '../models/id'
import ExerciseName from '../models/name'
import ExerciseDescription from './description'

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

  it.concurrent('can be created', () => {
    expect(exercise.__name__).toBe(__name__)
    expect(exercise.id).toBe(id)
    expect(exercise.name).toBe(name)
    expect(exercise.description).toBe(description)
  })
})
