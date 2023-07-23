import { Model } from 'mongoose'

import MongooseRoutineView from '~/routine/infrastructure/models/mongoose/view'

const MongooseRoutineViewModelMock = {
  mock: () =>
    ({
      create: jest.fn(),
      find: () => ({
        lean: () => ({
          exec: jest.fn(),
        }),
      }),
    } as unknown as Model<MongooseRoutineView>),
} as const

export default MongooseRoutineViewModelMock
