import { NamedType } from '~/shared/name-type'

export const expectIsNamed = (value: NamedType) => {
  expect(value).toHaveProperty('__name__')
}

export const itIsNamed = (value: NamedType) => {
  it.concurrent('is named', () => {
    expectIsNamed(value)
  })
}
