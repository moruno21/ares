import { itIsNamed } from '~/test/closures/shared/name-type'

import RoutineDeleted from './routine-deleted'

describe('RoutineDeleted', () => {
  const __name__ = 'RoutineDeleted'
  const id = 'id'
  const routineCreated = RoutineDeleted.with({
    id,
  })

  itIsNamed(routineCreated)

  it.concurrent('has an id', () => {
    expect(routineCreated).toHaveProperty('id')
  })

  it.concurrent('can be created', () => {
    expect(routineCreated.__name__).toBe(__name__)
    expect(routineCreated.id).toBe(id)
  })
})
