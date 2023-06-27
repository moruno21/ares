import { itIsNamed } from '~/test/shared/closures/name-type'

import ExerciseCreated from './exercise-created'

describe('ExerciseCreated', () => {
  const __name__ = 'ExerciseCreated'
  const id = 'id'
  const name = 'name'
  const description = 'description'
  const exerciseCreated = ExerciseCreated.with({ description, id, name })

  itIsNamed(exerciseCreated)

  it.concurrent('has an id', () => {
    expect(exerciseCreated).toHaveProperty('id')
  })

  it.concurrent('has a name', () => {
    expect(exerciseCreated).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(exerciseCreated).toHaveProperty('description')
  })

  it.concurrent('can be created', () => {
    expect(exerciseCreated.__name__).toBe(__name__)
    expect(exerciseCreated.id).toBe(id)
    expect(exerciseCreated.name).toBe(name)
    expect(exerciseCreated.description).toBe(description)
  })
})
