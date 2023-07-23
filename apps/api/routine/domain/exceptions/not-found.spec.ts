import { itIsAnException } from '~/test/closures/shared/domain/exception'

import NotFoundRoutine from './not-found'

describe('NotFoundRoutine', () => {
  const __name__ = 'NotFoundRoutine'

  describe('WithId', () => {
    const id = 'id'
    const notFound = NotFoundRoutine.withId(id)

    itIsAnException(notFound)

    it.concurrent('can be cause routine with this id does not exist', () => {
      expect(notFound.__name__).toBe(__name__)
      expect(notFound.code).toBe('not_found')
      expect(notFound.message).toBe(`Routine with id '${id}' cannot be found`)
    })
  })
})
