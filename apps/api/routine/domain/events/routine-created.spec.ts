import { itIsNamed } from '~/test/closures/shared/name-type'

import RoutineCreated from './routine-created'

describe('RoutineCreated', () => {
  const __name__ = 'RoutineCreated'
  const id = 'id'
  const name = 'name'
  const description = 'description'
  const routineCreated = RoutineCreated.with({ description, id, name })

  itIsNamed(routineCreated)

  it.concurrent('has an id', () => {
    expect(routineCreated).toHaveProperty('id')
  })

  it.concurrent('has a name', () => {
    expect(routineCreated).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(routineCreated).toHaveProperty('description')
  })

  it.concurrent('can be created', () => {
    expect(routineCreated.__name__).toBe(__name__)
    expect(routineCreated.id).toBe(id)
    expect(routineCreated.name).toBe(name)
    expect(routineCreated.description).toBe(description)
  })
})
