import Users from '~/user/domain/services/users'

const UsersMock = {
  mock: () =>
    ({
      save: jest.fn(),
      withId: jest.fn(),
    } as unknown as Users),
} as const

export default UsersMock
