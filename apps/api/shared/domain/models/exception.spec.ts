import { itIsAnException } from '~/test/shared/closures/domain/exception'

import Exception from './exception'

describe('Exception', () => {
  const __name__ = 'Exception'
  const code = 'code'
  const message = 'message'
  const exception = Exception.with({ __name__, code, message })

  itIsAnException(exception)

  it.concurrent('can be created', () => {
    expect(exception.__name__).toBe(__name__)
    expect(exception.code).toBe(code)
    expect(exception.message).toBe(message)
    expect(exception.trace).toMatch(new RegExp(`^${__name__}: ${message}`))
  })

  it.concurrent('can have a numeric code', () => {
    const numericCode = 404
    const numericCodeException = Exception.with({
      __name__,
      code: numericCode,
      message,
    })

    expect(numericCodeException.code).toBe(numericCode)
  })

  it.concurrent('can be converted to string', () => {
    expect(exception.toString()).toMatch(new RegExp(`^${__name__}: ${message}`))
  })
})
