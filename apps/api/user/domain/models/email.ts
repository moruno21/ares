import { ValueObject } from '~/shared/domain'

const __name__ = 'UserEmail'

type UserEmail = ValueObject<typeof __name__, string>

const UserEmail = {
  fromString: (value: UserEmail['value']): UserEmail => ({ __name__, value }),
} as const

export default UserEmail
