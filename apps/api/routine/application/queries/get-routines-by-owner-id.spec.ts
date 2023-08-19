import { itIsNamed } from '~/test/closures/shared/name-type'

import GetRoutinesByOwnerId from './get-routines-by-owner-id'

describe('GetRoutinesByOwnerId', () => {
  const __name__ = 'GetRoutinesByOwnerId'
  const ownerId = 'ownerId'
  const getRoutinesByOwnerId = GetRoutinesByOwnerId.with({ ownerId })

  itIsNamed(getRoutinesByOwnerId)

  it.concurrent('has an ownerId', () => {
    expect(getRoutinesByOwnerId).toHaveProperty('ownerId')
  })

  it.concurrent('can be created', () => {
    expect(getRoutinesByOwnerId.__name__).toBe(__name__)
    expect(getRoutinesByOwnerId.ownerId).toBe(ownerId)
  })
})
