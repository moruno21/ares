import { itIsNamed } from '~/test/closures/shared/name-type'

import ExerciseRedescribed from './exercise-redescribed'

describe('ExerciseRedescribed', () => {
  const __name__ = 'ExerciseRedescribed'
  const id = 'id'
  const description = 'description'
  const exerciseRedescribed = ExerciseRedescribed.with({ description, id })

  itIsNamed(exerciseRedescribed)

  it.concurrent('has an id', () => {
    expect(exerciseRedescribed).toHaveProperty('id')
  })

  it.concurrent('has a description', () => {
    expect(exerciseRedescribed).toHaveProperty('description')
  })

  it.concurrent('can be created', () => {
    expect(exerciseRedescribed.__name__).toBe(__name__)
    expect(exerciseRedescribed.id).toBe(id)
    expect(exerciseRedescribed.description).toBe(description)
  })
})
