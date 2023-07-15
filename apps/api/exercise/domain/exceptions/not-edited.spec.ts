import { itIsAnException } from '~/test/closures/shared/domain/exception'

import NotEditedExercise from './not-edited'

describe('NotEditedExercise', () => {
  const __name__ = 'NotEditedExercise'

  describe('NameAlreadyUsed', () => {
    const name = 'name'
    const notEdited = NotEditedExercise.causeAlreadyExistsOneWithName(name)

    itIsAnException(notEdited)

    it.concurrent('can be cause it is already used', () => {
      expect(notEdited.__name__).toBe(__name__)
      expect(notEdited.code).toBe('name_already_in_use')
      expect(notEdited.message).toBe(
        `Exercise with name '${name}' already exists`,
      )
    })
  })
})
