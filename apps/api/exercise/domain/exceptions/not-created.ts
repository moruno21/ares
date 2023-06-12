import { Exception } from '~/shared/domain'
import NamedType from '~/shared/named-type'

const __name__ = 'NotCreatedExercise'

const code = 'name_already_in_use'

type NotCreatedExercise = NamedType<Exception<typeof code>, typeof __name__>

const NotCreatedExercise = {
  causeAlreadyExistsOneWithName: (name: string): NotCreatedExercise => ({
    ...Exception.cause({
      code,
      message: `Exercise with name '${name}' already exists`,
    }),
    __name__,
  }),
} as const

export default NotCreatedExercise
