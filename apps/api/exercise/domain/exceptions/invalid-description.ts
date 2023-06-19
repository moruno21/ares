import { Exception } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'InvalidExerciseDescription'

const code = 'too_long_description'

type InvalidExerciseDescription = NameType<
  Exception<typeof code>,
  typeof __name__
>

const InvalidExerciseDescription = {
  causeIsTooLong: (): InvalidExerciseDescription => ({
    ...Exception.cause({
      code,
      message: 'Exercise description cannot be longer than 250 characters',
    }),
    __name__,
  }),
} as const

export default InvalidExerciseDescription
