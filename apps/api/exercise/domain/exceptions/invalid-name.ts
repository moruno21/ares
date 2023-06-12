import { Exception } from '~/shared/domain'
import NamedType from '~/shared/named-type'

const __name__ = 'InvalidExerciseName'

const code = 'blank'

type InvalidExerciseName = NamedType<Exception<typeof code>, typeof __name__>

const InvalidExerciseName = {
  causeIsBlank: (): InvalidExerciseName => ({
    ...Exception.cause({
      code,
      message: 'Exercise name cannot be blank',
    }),
    __name__,
  }),
} as const

export default InvalidExerciseName
