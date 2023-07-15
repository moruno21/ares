import ExerciseViews from '~/exercise/application/services/views'

const ExerciseViewsMock = {
  mock: () =>
    ({
      add: jest.fn(),
      delete: jest.fn(),
      getAll: jest.fn(),
      redescribe: jest.fn(),
      rename: jest.fn(),
      withId: jest.fn(),
      withName: jest.fn(),
    } as unknown as ExerciseViews),
} as const

export default ExerciseViewsMock
