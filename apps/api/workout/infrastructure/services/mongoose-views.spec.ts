import { Model } from 'mongoose'

import MongooseWorkoutViewModelMock from '~/test/mocks/workout/infrastructure/models/mongoose/view'
import WorkoutView from '~/workout/application/models/view'

import MongooseWorkoutView from '../models/mongoose/view'
import MongooseWorkoutViews from './mongoose-views'

describe('MongooseWorkoutViews', () => {
  let views: Model<MongooseWorkoutView>
  let mongooseViews: MongooseWorkoutViews

  const id = 'ff55f0fd-19c8-4973-9ea1-617ad55285df'
  const exerciseId = 'af3bd6be-0c1b-4779-b63f-4017d397b870'
  const reps = 8
  const sets = 8
  const view = WorkoutView.with({ exerciseId, id, reps, sets })

  beforeEach(() => {
    views = MongooseWorkoutViewModelMock.mock()
    mongooseViews = new MongooseWorkoutViews(views)
  })

  it('is a workout views service', () => {
    expect(mongooseViews).toHaveProperty('add')
  })

  it('adds a view', async () => {
    const viewsCreate = jest.spyOn(views, 'create')

    const response = await mongooseViews.add(view)

    expect(viewsCreate).toHaveBeenCalledWith(
      MongooseWorkoutView.fromWorkoutView(view),
    )
    expect(response).toBe(view)
  })
})
