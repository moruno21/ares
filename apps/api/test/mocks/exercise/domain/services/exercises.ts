import Exercises from '~/exercise/domain/services/exercises'

const ExercisesMock = {
  mock: () =>
    ({
      save: jest.fn(),
      withId: jest.fn(),
    } as unknown as Exercises),
} as const

export default ExercisesMock
