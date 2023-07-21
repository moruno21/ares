import Workouts from '~/workout/domain/services/workouts'

const WorkoutsMock = {
  mock: () =>
    ({
      save: jest.fn(),
    } as unknown as Workouts),
} as const

export default WorkoutsMock
