import { itIsNamed } from '~/test/closures/shared/name-type'

import RoutineView from './view'

describe('RoutineView', () => {
  const __name__ = 'RoutineView'
  const id = 'id'
  const name = 'name'
  const description = 'description'
  const view = RoutineView.with({ description, id, name })

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
