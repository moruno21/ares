import Exercises from '~/exercise/domain/services/exercises'

const ExercisesMock = {
  mock: () =>
    ({
      findWithId: jest.fn(),
      save: jest.fn(),
    } as unknown as Exercises),
} as const

export default ExercisesMock
