import { itIsNamed } from '~/test/closures/shared/name-type'

import GetRoutine from './get-routine'

describe('GetRoutine', () => {
  const __name__ = 'GetRoutine'
  const id = 'id'
  const getRoutine = GetRoutine.with({ id })

  itIsNamed(getRoutine)

  it.concurrent('has an id', () => {
    expect(getRoutine).toHaveProperty('id')
  })

  it.concurrent('can be created', () => {
    expect(getRoutine.__name__).toBe(__name__)
    expect(getRoutine.id).toBe(id)
  })
})
