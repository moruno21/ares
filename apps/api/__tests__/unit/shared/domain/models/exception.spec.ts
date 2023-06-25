import Exception from '~/shared/domain/models/exception'

describe('Exception', () => {
  const exception = Exception.with({
    __name__: 'Exception',
    code: 'code',
    message: 'message',
  })

  it.concurrent('has a code', () => {
    expect(exception.code).toBe('code')
  })

  it.concurrent('has a message', () => {
    expect(exception.message).toBe('message')
  })

  it.concurrent('has a trace', () => {
    expect(exception.trace).toMatch(/^Exception: message/)
  })
})
