import WorkoutViews from '~/workout/application/services/views'

const WorkoutViewsMock = {
  mock: () =>
    ({
      add: jest.fn(),
    } as unknown as WorkoutViews),
} as const

export default WorkoutViewsMock
