import NameType from '~/shared/name-type'

import Exception from '../models/exception'

const __name__ = 'InvalidUuid'

type Code = 'format'

type InvalidUuid = NameType<Exception<Code>, typeof __name__>

const InvalidUuid = {
  cause: (reason: { code: Code; message: string }): InvalidUuid => ({
    ...Exception.cause(reason),
    __name__,
  }),
  causeTheFormatIsNotValid: (value: string): InvalidUuid =>
    InvalidUuid.cause({
      code: 'format',
      message: `${value} has not a valid uuid format`,
    }),
} as const

export default InvalidUuid
