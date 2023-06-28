import { itIsNamed } from '~/test/closures/shared/name-type'

import CreateExercise from './create-exercise'

describe('CreateExercise', () => {
  const __name__ = 'CreateExercise'
  const id = 'id'
  const name = 'name'
  const description = 'description'
  const createExercise = CreateExercise.with({ description, id, name })

  itIsNamed(createExercise)

  it.concurrent('has an id', () => {
    expect(createExercise).toHaveProperty('id')
  })

  it.concurrent('has a name', () => {
    expect(createExercise).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(createExercise).toHaveProperty('description')
  })

  it.concurrent('can be created', () => {
    expect(createExercise.__name__).toBe(__name__)
    expect(createExercise.id).toBe(id)
    expect(createExercise.name).toBe(name)
    expect(createExercise.description).toBe(description)
  })
})
