import { Exception } from '~/shared/domain'

const __name__ = 'NotFoundRoutine'

const code = 'not_found'

type NotFoundRoutine = Exception<typeof __name__, typeof code>

const NotFoundRoutine = {
  withId: (id: string): NotFoundRoutine => ({
    ...Exception.with({
      __name__,
      code,
      message: `Routine with id '${id}' cannot be found`,
    }),
  }),
} as const

export default NotFoundRoutine
