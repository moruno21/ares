import { Exception } from '~/shared/domain'

const __name__ = 'NotFoundUser'

const code = 'not_found'

type NotFoundUser = Exception<typeof __name__, typeof code>

const NotFoundUser = {
  withEmail: (email: string): NotFoundUser => ({
    ...Exception.with({
      __name__,
      code,
      message: `User with email '${email}' cannot be found`,
    }),
  }),
  withId: (id: string): NotFoundUser => ({
    ...Exception.with({
      __name__,
      code,
      message: `User with id '${id}' cannot be found`,
    }),
  }),
} as const

export default NotFoundUser
