import NameType from '~/shared/name-type'

import Exception from '../models/exception'

const __name__ = 'InvalidId'

type Code = 'blank'

type InvalidId = NameType<Exception<Code>, typeof __name__>

const InvalidId = {
  cause: (reason: { code: Code; message: string }): InvalidId => ({
    ...Exception.cause(reason),
    __name__,
  }),
  causeIsBlank: (): InvalidId =>
    InvalidId.cause({ code: 'blank', message: 'Id cannot be blank' }),
} as const

export default InvalidId
