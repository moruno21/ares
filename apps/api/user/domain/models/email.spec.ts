import { itIsAValueObject } from '~/test/closures/shared/domain/value-object'

import UserEmail from './email'

describe('UserEmail', () => {
  const __name__ = 'UserEmail'
  const value = 'value'
  const name = UserEmail.fromString(value)

  itIsAValueObject(name)

  it.concurrent('can be created from string', () => {
    expect(name.__name__).toBe(__name__)
    expect(name.value).toBe(value)
  })
})
