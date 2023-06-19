import { Exception } from '~/shared/domain'
import NameType from '~/shared/name-type'

const __name__ = 'NotFoundExercise'

const code = 'not_found'

type NotFoundExercise = NameType<Exception<typeof code>, typeof __name__>

const NotFoundExercise = {
  withId: (id: string): NotFoundExercise => ({
    ...Exception.cause({
      code,
      message: `Exercise with id '${id}' cannot be found`,
    }),
    __name__,
  }),
  withName: (name: string): NotFoundExercise => ({
    ...Exception.cause({
      code,
      message: `Exercise with name '${name}' cannot be found`,
    }),
    __name__,
  }),
} as const

export default NotFoundExercise
