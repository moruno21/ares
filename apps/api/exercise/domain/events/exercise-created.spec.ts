import { itIsNamed } from '~/test/shared/closures/name-type'

import CreatedExercise from './exercise-created'

describe('CreatedExercise', () => {
  const __name__ = 'ExerciseCreated'

  const id = 'id'
  const name = 'name'
  const description = 'description'

  const createdExercise = CreatedExercise.with({ description, id, name })

  itIsNamed(createdExercise)

  it.concurrent('has an id', () => {
    expect(createdExercise).toHaveProperty('id')
  })

  it.concurrent('has a name', () => {
    expect(createdExercise).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(createdExercise).toHaveProperty('description')
  })

  it.concurrent('can be created', () => {
    expect(createdExercise.__name__).toBe(__name__)
    expect(createdExercise.id).toBe(id)
    expect(createdExercise.name).toBe(name)
    expect(createdExercise.description).toBe(description)
  })
})
