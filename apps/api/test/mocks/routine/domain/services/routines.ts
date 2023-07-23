import Routines from '~/routine/domain/services/routines'

const RoutinesMock = {
  mock: () =>
    ({
      findWithId: jest.fn(),
      save: jest.fn(),
    } as unknown as Routines),
} as const

export default RoutinesMock
