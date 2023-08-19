import UserViews from '~/user/application/services/views'

const UserViewsMock = {
  mock: () =>
    ({
      add: jest.fn(),
      getAll: jest.fn(),
      withEmail: jest.fn(),
      withId: jest.fn(),
    } as unknown as UserViews),
} as const

export default UserViewsMock
