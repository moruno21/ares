import RoutineViews from '~/routine/application/services/views'

const RoutineViewsMock = {
  mock: () =>
    ({
      add: jest.fn(),
      delete: jest.fn(),
      getAll: jest.fn(),
      withId: jest.fn(),
    } as unknown as RoutineViews),
} as const

export default RoutineViewsMock
