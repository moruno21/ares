import { itIsAnException } from '~/test/closures/shared/domain/exception'

import NotCreatedUser from './not-created'

describe('NotCreatedUser', () => {
  const __name__ = 'NotCreatedUser'

  describe('EmailAlreadyUsed', () => {
    const email = 'name@gmail.com'
    const notCreated = NotCreatedUser.causeAlreadyExistsOneWithEmail(email)

    itIsAnException(notCreated)

    it.concurrent('can be cause it is already used', () => {
      expect(notCreated.__name__).toBe(__name__)
      expect(notCreated.code).toBe('email_already_in_use')
      expect(notCreated.message).toBe(
        `User with email '${email}' already exists`,
      )
    })
  })
})
