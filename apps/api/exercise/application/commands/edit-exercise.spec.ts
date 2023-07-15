import { itIsNamed } from '~/test/closures/shared/name-type'

import EditExercise from './edit-exercise'

describe('EditExercise', () => {
  const __name__ = 'EditExercise'
  const id = 'id'
  const name = 'name'
  const description = 'description'
  const editExercise = EditExercise.with({ description, id, name })

  itIsNamed(editExercise)

  it.concurrent('has an id', () => {
    expect(editExercise).toHaveProperty('id')
  })

  it.concurrent('has a name', () => {
    expect(editExercise).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(editExercise).toHaveProperty('description')
  })

  it.concurrent('can be created', () => {
    expect(editExercise.__name__).toBe(__name__)
    expect(editExercise.id).toBe(id)
    expect(editExercise.name).toBe(name)
    expect(editExercise.description).toBe(description)
  })
})
