import RoutineViews from '~/routine/application/services/views'

const RoutineViewsMock = {
  mock: () =>
    ({
      add: jest.fn(),
      getAll: jest.fn(),
    } as unknown as RoutineViews),
} as const

export default RoutineViewsMock
