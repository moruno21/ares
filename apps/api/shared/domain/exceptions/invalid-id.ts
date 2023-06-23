import Exception from '../models/exception'

const __name__ = 'InvalidId'

const code = 'blank'

type InvalidId = Exception<typeof __name__, typeof code>

const InvalidId = {
  causeIsBlank: (): InvalidId =>
    Exception.with({ __name__, code, message: 'Id cannot be blank' }),
} as const

export default InvalidId
