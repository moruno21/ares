import NameType from '~/shared/name-type'

const __name__ = 'UserView'

type UserView = NameType<
  Readonly<{
    email: string
    id: string
    name: string
  }>,
  typeof __name__
>

const UserView = {
  with: (props: Omit<UserView, '__name__'>): UserView => ({
    ...props,
    __name__,
  }),
} as const

export default UserView
