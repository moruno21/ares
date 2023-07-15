import { itIsNamed } from '~/test/closures/shared/name-type'

import ExerciseRedescribed from './exercise-redescribed'

describe('ExerciseRedescribed', () => {
  const __name__ = 'ExerciseRedescribed'
  const id = 'id'
  const description = 'description'
  const exerciseRenamed = ExerciseRedescribed.with({ description, id })

  itIsNamed(exerciseRenamed)

  it.concurrent('has an id', () => {
    expect(exerciseRenamed).toHaveProperty('id')
  })

  it.concurrent('has a description', () => {
    expect(exerciseRenamed).toHaveProperty('description')
  })

  it.concurrent('can be created', () => {
    expect(exerciseRenamed.__name__).toBe(__name__)
    expect(exerciseRenamed.id).toBe(id)
    expect(exerciseRenamed.description).toBe(description)
  })
})
