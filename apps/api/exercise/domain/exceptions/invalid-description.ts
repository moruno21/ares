import { Exception } from '~/shared/domain'

const __name__ = 'InvalidExerciseDescription'

const code = 'too_long'

type InvalidExerciseDescription = Exception<typeof __name__, typeof code>

const InvalidExerciseDescription = {
  causeIsTooLong: (): InvalidExerciseDescription => ({
    ...Exception.with({
      __name__,
      code,
      message: 'Exercise description cannot be longer than 250 characters',
    }),
  }),
} as const

export default InvalidExerciseDescription
