import { itIsAnException } from '~/test/closures/shared/domain/exception'

import NotFoundUser from './not-found'

describe('NotFoundUser', () => {
  const __name__ = 'NotFoundUser'

  describe('WithId', () => {
    const id = 'id'
    const notFound = NotFoundUser.withId(id)

    itIsAnException(notFound)

    it.concurrent('can be cause user with this id does not exist', () => {
      expect(notFound.__name__).toBe(__name__)
      expect(notFound.code).toBe('not_found')
      expect(notFound.message).toBe(`User with id '${id}' cannot be found`)
    })
  })

  describe('WithEmail', () => {
    const email = 'name@gmail.com'
    const notFound = NotFoundUser.withEmail(email)

    itIsAnException(notFound)

    it.concurrent('can be cause user with this email does not exist', () => {
      expect(notFound.__name__).toBe(__name__)
      expect(notFound.code).toBe('not_found')
      expect(notFound.message).toBe(
        `User with email '${email}' cannot be found`,
      )
    })
  })
})
