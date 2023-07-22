import { Exception } from '~/shared/domain'

const __name__ = 'InvalidRoutineName'

const blankCode = 'blank'
const tooLongCode = 'too_long'

type InvalidRoutineName = Exception<
  typeof __name__,
  typeof blankCode | typeof tooLongCode
>

const InvalidRoutineName = {
  causeIsBlank: (): InvalidRoutineName => ({
    ...Exception.with({
      __name__,
      code: blankCode,
      message: 'Routine name cannot be blank',
    }),
  }),
  causeIsTooLong: (): InvalidRoutineName => ({
    ...Exception.with({
      __name__,
      code: tooLongCode,
      message: 'Routine name cannot be longer than 50 characters',
    }),
  }),
} as const

export default InvalidRoutineName
