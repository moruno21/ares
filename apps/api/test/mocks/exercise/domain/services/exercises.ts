import Exercises from '~/exercise/domain/services/exercises'

const ExercisesMock = {
  mock: () => ({ add: jest.fn() } as unknown as Exercises),
} as const

export default ExercisesMock
