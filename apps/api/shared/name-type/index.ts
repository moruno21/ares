export type NamedType<Name extends string = string> = Readonly<{
  __name__: Name
}>

type NameType<
  Type extends Record<string, unknown>,
  Name extends string = string,
> = Omit<Type, '__name__'> & {
  readonly __name__: Name
}

export default NameType
