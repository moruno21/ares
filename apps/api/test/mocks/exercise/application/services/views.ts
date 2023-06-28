import ExerciseViews from '~/exercise/application/services/views'

const ExerciseViewsMock = {
  mock: () =>
    ({
      add: jest.fn(),
      getAll: jest.fn(),
      withId: jest.fn(),
      withName: jest.fn(),
    } as unknown as ExerciseViews),
} as const

export default ExerciseViewsMock
