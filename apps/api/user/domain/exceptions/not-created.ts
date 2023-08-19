import { Exception } from '~/shared/domain'

const __name__ = 'NotCreatedUser'

const code = 'email_already_in_use'

type NotCreatedUser = Exception<typeof __name__, typeof code>

const NotCreatedUser = {
  causeAlreadyExistsOneWithEmail: (email: string): NotCreatedUser => ({
    ...Exception.with({
      __name__,
      code,
      message: `User with email '${email}' already exists`,
    }),
  }),
} as const

export default NotCreatedUser
