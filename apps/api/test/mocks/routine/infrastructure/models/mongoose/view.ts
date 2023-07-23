import { Model } from 'mongoose'

import MongooseRoutineView from '~/routine/infrastructure/models/mongoose/view'

const MongooseRoutineViewModelMock = {
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
    } as unknown as Model<MongooseRoutineView>),
} as const

export default MongooseRoutineViewModelMock
