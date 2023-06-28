import { itIsNamed } from '~/test/closures/shared/name-type'

import ExerciseView from './view'

describe('ExerciseView', () => {
  const __name__ = 'ExerciseView'
  const id = 'id'
  const name = 'name'
  const description = 'description'
  const view = ExerciseView.with({ description, id, name })

  itIsNamed(view)

  it.concurrent('has an id', () => {
    expect(view).toHaveProperty('id')
  })

  it.concurrent('has a name', () => {
    expect(view).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(view).toHaveProperty('description')
  })

  it.concurrent('can be created', () => {
    expect(view.__name__).toBe(__name__)
    expect(view.id).toBe(id)
    expect(view.name).toBe(name)
    expect(view.description).toBe(description)
  })
})
