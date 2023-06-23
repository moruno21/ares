import { Exception } from '~/shared/domain'

const __name__ = 'NotCreatedExercise'

const code = 'name_already_in_use'

type NotCreatedExercise = Exception<typeof __name__, typeof code>

const NotCreatedExercise = {
  causeAlreadyExistsOneWithName: (name: string): NotCreatedExercise => ({
    ...Exception.with({
      __name__,
      code,
      message: `Exercise with name '${name}' already exists`,
    }),
  }),
} as const

export default NotCreatedExercise
