import { itIsNamed } from '~/test/closures/shared/name-type'

import DeleteRoutine from './delete-routine'

describe('DeleteRoutine', () => {
  const __name__ = 'DeleteRoutine'
  const id = 'id'
  const deleteRoutine = DeleteRoutine.with({ id })

  itIsNamed(deleteRoutine)

  it.concurrent('has an id', () => {
    expect(deleteRoutine).toHaveProperty('id')
  })

  it.concurrent('can be created', () => {
    expect(deleteRoutine.__name__).toBe(__name__)
    expect(deleteRoutine.id).toBe(id)
  })
})
