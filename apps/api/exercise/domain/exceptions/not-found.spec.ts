import { itIsAnException } from '~/test/closures/shared/domain/exception'

import NotFoundExercise from './not-found'

describe('NotFoundExercise', () => {
  const __name__ = 'NotFoundExercise'

  describe('WithId', () => {
    const id = 'id'
    const notFound = NotFoundExercise.withId(id)

    itIsAnException(notFound)

    it.concurrent('can be cause exercise with this id does not exist', () => {
      expect(notFound.__name__).toBe(__name__)
      expect(notFound.code).toBe('not_found')
      expect(notFound.message).toBe(`Exercise with id '${id}' cannot be found`)
    })
  })

  describe('WithName', () => {
    const name = 'name'
    const notFound = NotFoundExercise.withName(name)

    itIsAnException(notFound)

    it.concurrent('can be cause exercise with this name does not exist', () => {
      expect(notFound.__name__).toBe(__name__)
      expect(notFound.code).toBe('not_found')
      expect(notFound.message).toBe(
        `Exercise with name '${name}' cannot be found`,
      )
    })
  })
})
