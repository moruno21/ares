import ValueObject from '../value-object'

type Id = Readonly<ValueObject<string>>

const Id = {
  fromString: (value: string): Id => ValueObject.fromValue(value),
} as const

export default Id
