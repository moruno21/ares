import { itIsNamed } from '~/test/closures/shared/name-type'

import RoutineRedescribed from './routine-redescribed'

describe('RoutineRedescribed', () => {
  const __name__ = 'RoutineRedescribed'
  const id = 'id'
  const description = 'description'
  const routineRedescribed = RoutineRedescribed.with({ description, id })

  itIsNamed(routineRedescribed)

  it.concurrent('has an id', () => {
    expect(routineRedescribed).toHaveProperty('id')
  })

  it.concurrent('has a description', () => {
    expect(routineRedescribed).toHaveProperty('description')
  })

  it.concurrent('can be created', () => {
    expect(routineRedescribed.__name__).toBe(__name__)
    expect(routineRedescribed.id).toBe(id)
    expect(routineRedescribed.description).toBe(description)
  })
})
