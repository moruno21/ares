import { Model } from 'mongoose'

import MongooseWorkoutView from '~/workout/infrastructure/models/mongoose/view'

const MongooseWorkoutViewModelMock = {
  mock: () =>
    ({
      create: jest.fn(),
    } as unknown as Model<MongooseWorkoutView>),
} as const

export default MongooseWorkoutViewModelMock
