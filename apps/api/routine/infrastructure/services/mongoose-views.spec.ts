import { Model, Query } from 'mongoose'

import RoutineView from '~/routine/application/models/view'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import MongooseRoutineViews from '~/routine/infrastructure/services/mongoose-views'
import Either, { Left } from '~/shared/either'
import MongooseRoutineViewModelMock from '~/test/mocks/routine/infrastructure/models/mongoose/view'

import MongooseRoutineView from '../models/mongoose/view'

describe('MongooseRoutineViews', () => {
  let views: Model<MongooseRoutineView>
  let mongooseViews: MongooseRoutineViews

  const id = '628c7043-617a-411a-ad1f-3da814e9e34b'
  const name = 'name'
  const description = 'description'
  const workouts = [{ exerciseId: 'exerciseId', reps: 10, sets: 4 }]
  const view = RoutineView.with({ description, id, name, workouts })

  beforeEach(() => {
    views = MongooseRoutineViewModelMock.mock()
    mongooseViews = new MongooseRoutineViews(views)
  })

  it('is a routine views service', () => {
    expect(mongooseViews).toHaveProperty('add')
    expect(mongooseViews).toHaveProperty('getAll')
    expect(mongooseViews).toHaveProperty('withId')
  })

  it('adds a view', async () => {
    const viewsCreate = jest.spyOn(views, 'create')

    const response = await mongooseViews.add(view)

    expect(viewsCreate).toHaveBeenCalledWith(
      MongooseRoutineView.fromRoutineView(view),
    )
    expect(response).toBe(view)
  })

  it('gets all the views', async () => {
    const viewsFind = jest.spyOn(views, 'find')
    const mongooseView = MongooseRoutineView.fromRoutineView(view)
    const anotherView = RoutineView.with({
      description: 'description',
      id: 'af3adc50-b5df-4922-8b9e-93082661505c',
      name: 'name',
      workouts,
    })
    const anotherMongooseView = MongooseRoutineView.fromRoutineView(anotherView)

    viewsFind.mockReturnValue({
      lean: () => ({
        exec: async () => [mongooseView, anotherMongooseView],
      }),
    } as Query<unknown[], unknown>)

    const response = await mongooseViews.getAll()

    expect(viewsFind).toHaveBeenCalled()
    expect(response).toStrictEqual([view, anotherView])
  })

  it('returns an empty array when trying to get all the views and there are not', async () => {
    const viewsFind = jest.spyOn(views, 'find')

    viewsFind.mockReturnValue({
      lean: () => ({
        exec: async () => [],
      }),
    } as Query<unknown[], unknown>)

    const response = await mongooseViews.getAll()

    expect(viewsFind).toHaveBeenCalled()
    expect(response).toStrictEqual([])
  })

  it('finds a view if exists with id', async () => {
    const viewsFindOne = jest.spyOn(views, 'findOne')
    const mongooseView = MongooseRoutineView.fromRoutineView(view)

    viewsFindOne.mockReturnValue({
      lean: () => ({
        exec: async () => mongooseView,
      }),
    } as Query<unknown, unknown>)

    const response = await mongooseViews.withId(id)

    expect(viewsFindOne).toHaveBeenCalledWith({ _id: id })
    expect(response).toStrictEqual(
      Either.right(MongooseRoutineView.toRoutineView(mongooseView)),
    )
  })

  it('cannot find a view if does not exist with id', async () => {
    const viewsFindOne = jest.spyOn(views, 'findOne')
    const notFound = NotFoundRoutine.withId(id)

    viewsFindOne.mockReturnValue({
      lean: () => ({ exec: async () => null }),
    } as Query<unknown, unknown>)

    const response = (await mongooseViews.withId(id)) as Left<NotFoundRoutine>

    expect(viewsFindOne).toHaveBeenCalledWith({ _id: id })
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
