import { itIsAnException } from '~/test/closures/shared/domain/exception'

import NotCreatedExercise from './not-created'

describe('NotCreatedExercise', () => {
  const __name__ = 'NotCreatedExercise'

  describe('NameAlreadyUsed', () => {
    const name = 'name'
    const notCreated = NotCreatedExercise.causeAlreadyExistsOneWithName(name)

    itIsAnException(notCreated)

    it.concurrent('can be cause it is already used', () => {
      expect(notCreated.__name__).toBe(__name__)
      expect(notCreated.code).toBe('name_already_in_use')
      expect(notCreated.message).toBe(
        `Exercise with name '${name}' already exists`,
      )
    })
  })
})
