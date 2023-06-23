import { Exception } from '~/shared/domain'

const __name__ = 'NotFoundExercise'

const code = 'not_found'

type NotFoundExercise = Exception<typeof __name__, typeof code>

const NotFoundExercise = {
  withId: (id: string): NotFoundExercise => ({
    ...Exception.with({
      __name__,
      code,
      message: `Exercise with id '${id}' cannot be found`,
    }),
  }),
  withName: (name: string): NotFoundExercise => ({
    ...Exception.with({
      __name__,
      code,
      message: `Exercise with name '${name}' cannot be found`,
    }),
  }),
} as const

export default NotFoundExercise
