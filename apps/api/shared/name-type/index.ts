type NameType<
  Type extends Record<string, unknown>,
  Name extends string = string,
> = Omit<Type, '__name__'> & {
  readonly __name__: Name
}

export default NameType
