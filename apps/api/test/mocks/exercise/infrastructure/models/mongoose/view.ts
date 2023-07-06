import { Model } from 'mongoose'

import MongooseExerciseView from '~/exercise/infrastructure/models/mongoose/view'

const MongooseExerciseViewMock = {
  mock: () =>
    ({
      create: jest.fn(),
      deleteOne: () => ({
        lean: () => ({
          exec: jest.fn(),
        }),
      }),
      find: () => ({
        lean: () => ({
          exec: jest.fn(),
        }),
      }),
      findOne: () => ({
        lean: () => ({
          exec: jest.fn(),
        }),
      }),
    } as unknown as Model<MongooseExerciseView>),
} as const

export default MongooseExerciseViewMock
