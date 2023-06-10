import NamedType from '~/shared/named-type'

type ValueObject<Type extends boolean | number | string> = Readonly<{
  value: Type
}>

const ValueObject = {
  equals: <Name extends string, Type extends boolean | number | string>(
    a: NamedType<ValueObject<Type>, Name>,
    b: NamedType<ValueObject<Type>, Name>,
  ): boolean => a.__name__ === b.__name__ && a.value === b.value,
} as const

export default ValueObject
