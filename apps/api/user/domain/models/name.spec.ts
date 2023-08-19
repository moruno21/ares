import { itIsAValueObject } from '~/test/closures/shared/domain/value-object'

import UserName from './name'

describe('UserName', () => {
  const __name__ = 'UserName'
  const value = 'value'
  const name = UserName.fromString(value)

  itIsAValueObject(name)

  it.concurrent('can be created from string', () => {
    expect(name.__name__).toBe(__name__)
    expect(name.value).toBe(value)
  })
})
