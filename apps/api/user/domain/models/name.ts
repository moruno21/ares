import { ValueObject } from '~/shared/domain'

const __name__ = 'UserName'

type UserName = ValueObject<typeof __name__, string>

const UserName = {
  fromString: (value: UserName['value']): UserName => ({ __name__, value }),
} as const

export default UserName
