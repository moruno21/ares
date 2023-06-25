import deepEquals from '~/shared/deep-equals'
import NameType from '~/shared/name-type'

type ValueType =
  | {
      [key: string]: ValueType
    }
  | boolean
  | number
  | string
  | undefined
  | ValueType[]

type ValueObject<
  Name extends string = string,
  Value extends ValueType = ValueType,
> = NameType<Readonly<{ value: Value }>, Name>

const ValueObject = {
  equals: <Name extends string, Value extends ValueType>(
    a: ValueObject<Name, Value>,
    b: ValueObject<Name, Value>,
  ): boolean => a.__name__ === b.__name__ && deepEquals(a.value, b.value),
  with: <Name extends string, Value extends ValueType>(
    props: ValueObject<Name, Value>,
  ): ValueObject<Name, Value> => props,
} as const

export default ValueObject
