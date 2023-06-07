import Exception from './exception'

describe('Exception', () => {
  it('has a reason', () => {
    const exception = Exception.cause({ code: 'code', message: 'message' })

    expect(exception.code).toBe('code')
    expect(exception.message).toBe('message')
  })

  it('has a trace', () => {
    const exception = Exception.cause({ code: 'code', message: 'message' })

    expect(exception.trace).toMatch(/^Exception: message/)
  })
})
