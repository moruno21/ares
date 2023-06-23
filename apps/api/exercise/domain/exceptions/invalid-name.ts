import { Exception } from '~/shared/domain'

const __name__ = 'InvalidExerciseName'

const blankCode = 'blank'
const longCode = 'too_long_name'

type InvalidExerciseName = Exception<
  typeof __name__,
  typeof blankCode | typeof longCode
>

const InvalidExerciseName = {
  causeIsBlank: (): InvalidExerciseName => ({
    ...Exception.with({
      __name__,
      code: blankCode,
      message: 'Exercise name cannot be blank',
    }),
  }),
  causeIsTooLong: (): InvalidExerciseName => ({
    ...Exception.with({
      __name__,
      code: longCode,
      message: 'Exercise name cannot be longer than 50 characters',
    }),
  }),
} as const

export default InvalidExerciseName
