type ValueObject<T> = Readonly<{
  isEqualTo: (valueObject: ValueObject<T>) => boolean
  value: () => T
}>

const ValueObject = {
  fromValue: <T extends string | number | boolean | Date>(
    value: T,
  ): ValueObject<T> => ({
    isEqualTo: (valueObject) => value === valueObject.value(),
    value: () => value,
  }),
} as const

export default ValueObject
