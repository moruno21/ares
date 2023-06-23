import Exception from '../models/exception'

const __name__ = 'InvalidUuid'

const code = 'format'

type InvalidUuid = Exception<typeof __name__, typeof code>

const InvalidUuid = {
  causeTheFormatIsNotValid: (value: string): InvalidUuid =>
    Exception.with({
      __name__,
      code: 'format',
      message: `${value} has not a valid uuid format`,
    }),
} as const

export default InvalidUuid
