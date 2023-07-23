import { itIsNamed } from '~/test/closures/shared/name-type'

import GetRoutines from './get-routines'

describe('GetRoutines', () => {
  const __name__ = 'GetRoutines'
  const getRoutines = GetRoutines.all()

  itIsNamed(getRoutines)

  it.concurrent('can be created', () => {
    expect(getRoutines.__name__).toBe(__name__)
  })
})
