import Routines from '~/routine/domain/services/routines'

const RoutinesMock = {
  mock: () =>
    ({
      save: jest.fn(),
      withId: jest.fn(),
    } as unknown as Routines),
} as const

export default RoutinesMock
