import { Model } from 'mongoose'

import MongooseUserView from '~/user/infrastructure/models/mongoose/view'

const MongooseUserViewModelMock = {
  mock: () =>
    ({
      create: jest.fn(),
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
    } as unknown as Model<MongooseUserView>),
} as const

export default MongooseUserViewModelMock
