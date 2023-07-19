import { Exception } from '~/shared/domain'

const __name__ = 'InvalidExerciseName'

const blankCode = 'blank'
const tooLongCode = 'too_long'

type InvalidExerciseName = Exception<
  typeof __name__,
  typeof blankCode | typeof tooLongCode
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
      code: tooLongCode,
      message: 'Exercise name cannot be longer than 50 characters',
    }),
  }),
} as const

export default InvalidExerciseName
