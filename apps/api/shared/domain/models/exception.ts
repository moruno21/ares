type Exception<Code extends number | string = number | string> = Readonly<{
  code: Code
  message: string
  toString: () => string
  trace?: string
}>

const Exception = {
  cause: <Code extends number | string>(reason: {
    code: Code
    message: string
  }): Exception<Code> => {
    const info = `Exception: ${reason.message}`
    const stack = new Error().stack
    const trace = stack
      ? `${info}${stack.substring(stack.indexOf('\n'))}`
      : undefined

    return {
      ...reason,
      toString: () => trace ?? info,
      trace,
    }
  },
} as const

export default Exception
