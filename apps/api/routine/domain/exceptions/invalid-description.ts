import { Exception } from '~/shared/domain'

const __name__ = 'InvalidRoutineDescription'

const code = 'too_long'

type InvalidRoutineDescription = Exception<typeof __name__, typeof code>

const InvalidRoutineDescription = {
  causeIsTooLong: (): InvalidRoutineDescription => ({
    ...Exception.with({
      __name__,
      code,
      message: 'Routine description cannot be longer than 250 characters',
    }),
  }),
} as const

export default InvalidRoutineDescription
