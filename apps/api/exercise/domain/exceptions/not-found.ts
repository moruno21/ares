import { Exception } from '~/shared/domain'
import NamedType from '~/shared/named-type'

const __name__ = 'NotFoundExercise'

const code = 'not_found'

type NotFoundExercise = NamedType<Exception<typeof code>, typeof __name__>

const NotFoundExercise = {
  withName: (name: string): NotFoundExercise => ({
    ...Exception.cause({
      code,
      message: `Exercise with name '${name}' cannot be found`,
    }),
    __name__,
  }),
} as const

export default NotFoundExercise
