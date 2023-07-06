import Exercises from '~/exercise/domain/services/exercises'

const ExercisesMock = {
  mock: () =>
    ({
      add: jest.fn(),
      delete: jest.fn(),
      findWithId: jest.fn(),
    } as unknown as Exercises),
} as const

export default ExercisesMock
