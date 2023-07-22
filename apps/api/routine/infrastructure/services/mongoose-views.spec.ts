import { Model } from 'mongoose'

import RoutineView from '~/routine/application/models/view'
import MongooseRoutineViews from '~/routine/infrastructure/services/mongoose-views'
import MongooseRoutineViewModelMock from '~/test/mocks/routine/infrastructure/models/mongoose/view'

import MongooseRoutineView from '../models/mongoose/view'

describe('MongooseRoutineViews', () => {
  let views: Model<MongooseRoutineView>
  let mongooseViews: MongooseRoutineViews

  const id = '628c7043-617a-411a-ad1f-3da814e9e34b'
  const name = 'name'
  const description = 'description'
  const view = RoutineView.with({ description, id, name })

  beforeEach(() => {
    views = MongooseRoutineViewModelMock.mock()
    mongooseViews = new MongooseRoutineViews(views)
  })

  it('is a routine views service', () => {
    expect(mongooseViews).toHaveProperty('add')
  })

  it('adds a view', async () => {
    const viewsCreate = jest.spyOn(views, 'create')

    const response = await mongooseViews.add(view)

    expect(viewsCreate).toHaveBeenCalledWith(
      MongooseRoutineView.fromRoutineView(view),
    )
    expect(response).toBe(view)
  })
})
