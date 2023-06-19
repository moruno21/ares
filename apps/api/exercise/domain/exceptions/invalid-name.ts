import { Exception } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'InvalidExerciseName'

const blankCode = 'blank'
const longCode = 'too_long_name'

type InvalidExerciseName = NameType<
  Exception<typeof blankCode | typeof longCode>,
  typeof __name__
>

const InvalidExerciseName = {
  causeIsBlank: (): InvalidExerciseName => ({
    ...Exception.cause({
      code: blankCode,
      message: 'Exercise name cannot be blank',
    }),
    __name__,
  }),
  causeIsTooLong: (): InvalidExerciseName => ({
    ...Exception.cause({
      code: longCode,
      message: 'Exercise name cannot be longer than 50 characters',
    }),
    __name__,
  }),
} as const

export default InvalidExerciseName
