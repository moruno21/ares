import Exception from '~/shared/domain/models/exception'

import { expectIsNamed } from '../name-type'

export const itIsAnException = (value: Exception) => {
  it.concurrent('is an exception', () => {
    expectIsNamed(value)
    expect(value).toHaveProperty('code')
    expect(value).toHaveProperty('message')
    expect(value).toHaveProperty('trace')
    expect(value).toHaveProperty('toString')
  })
}
