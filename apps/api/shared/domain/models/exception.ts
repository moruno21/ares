import NameType from '~/shared/name-type'

type Exception<
  Name extends string = string,
  Code extends number | string = number | string,
> = NameType<
  Readonly<{
    code: Code
    message: string
    toString: () => string
    trace?: string
  }>,
  Name
>

const Exception = {
  with: <Name extends string, Code extends number | string>({
    __name__,
    message,
    ...props
  }: Omit<Exception<Name, Code>, 'toString' | 'trace'>): Exception<
    Name,
    Code
  > => {
    const info = `${__name__}: ${message}`
    const stack = new Error().stack
    const trace = stack
      ? `${info}${stack.substring(stack.indexOf('\n'))}`
      : undefined

    return {
      ...props,
      __name__,
      message,
      toString: () => trace ?? info,
      trace,
    }
  },
} as const

export default Exception
