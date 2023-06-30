import { Query } from 'mongoose'

import ExerciseView from '~/exercise/application/models/view'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import MongooseExerciseViews from '~/exercise/infrastructure/services/mongoose-views'
import Either, { Left } from '~/shared/either'
import MongooseExerciseViewMock from '~/test/mocks/exercise/infrastructure/models/mongoose/view'

import MongooseExerciseView from '../models/mongoose/view'

describe('MongooseExerciseViews', () => {
  let views = MongooseExerciseViewMock.mock()
  let mongooseViews = new MongooseExerciseViews(views)
  const id = 'f4581979-42df-4bc0-acd8-0d7d7f071072'
  const name = 'name'
  const description = 'description'
  const view = ExerciseView.with({ description, id, name })

  beforeEach(() => {
    views = MongooseExerciseViewMock.mock()
    mongooseViews = new MongooseExerciseViews(views)
  })

  it.concurrent('is an exercise views service', () => {
    expect(mongooseViews).toHaveProperty('add')
    expect(mongooseViews).toHaveProperty('getAll')
    expect(mongooseViews).toHaveProperty('withId')
    expect(mongooseViews).toHaveProperty('withName')
  })

  it('adds a view', async () => {
    const viewsCreate = jest.spyOn(views, 'create')

    const response = await mongooseViews.add(view)

    expect(viewsCreate).toHaveBeenCalledWith(
      MongooseExerciseView.fromExerciseView(view),
    )
    expect(response).toBe(view)
  })

  it('returns an emtpy array when trying to get all the views and there are not', async () => {
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

  it('gets all the views', async () => {
    const viewsFind = jest.spyOn(views, 'find')
    const mongooseView = MongooseExerciseView.fromExerciseView(view)
    const anotherView = ExerciseView.with({
      description: 'description',
      id: 'af3adc50-b5df-4922-8b9e-93082661505c',
      name: 'name',
    })
    const anotherMongooseView =
      MongooseExerciseView.fromExerciseView(anotherView)

    viewsFind.mockReturnValue({
      lean: () => ({
        exec: async () => [mongooseView, anotherMongooseView],
      }),
    } as Query<unknown[], unknown>)

    const response = await mongooseViews.getAll()

    expect(viewsFind).toHaveBeenCalled()
    expect(response).toStrictEqual([view, anotherView])
  })

  it('finds a view if exists with id', async () => {
    const viewsFindOne = jest.spyOn(views, 'findOne')
    const mongooseView = MongooseExerciseView.fromExerciseView(view)

    viewsFindOne.mockReturnValue({
      lean: () => ({
        exec: async () => mongooseView,
      }),
    } as Query<unknown, unknown>)

    const response = await mongooseViews.withId(id)

    expect(viewsFindOne).toHaveBeenCalledWith({ _id: id })
    expect(response).toStrictEqual(
      Either.right(MongooseExerciseView.toExerciseView(mongooseView)),
    )
  })

  it('cannot find a view if does not exist with id', async () => {
    const viewsFindOne = jest.spyOn(views, 'findOne')
    const notFound = NotFoundExercise.withId(id)

    viewsFindOne.mockReturnValue({
      lean: () => ({ exec: async () => null }),
    } as Query<unknown, unknown>)

    const response = (await mongooseViews.withId(id)) as Left<NotFoundExercise>

    expect(viewsFindOne).toHaveBeenCalledWith({ _id: id })
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })

  it('finds a view if exists with name', async () => {
    const viewsFindOne = jest.spyOn(views, 'findOne')
    const mongooseView = MongooseExerciseView.fromExerciseView(view)

    viewsFindOne.mockReturnValue({
      lean: () => ({
        exec: async () => mongooseView,
      }),
    } as Query<unknown, unknown>)

    const response = await mongooseViews.withName(name)

    expect(viewsFindOne).toHaveBeenCalledWith({ name })
    expect(response).toStrictEqual(
      Either.right(MongooseExerciseView.toExerciseView(mongooseView)),
    )
  })

  it('cannot find a view if does not exist with name', async () => {
    const viewsFindOne = jest.spyOn(views, 'findOne')
    const notFound = NotFoundExercise.withName(name)

    viewsFindOne.mockReturnValue({
      lean: () => ({ exec: async () => null }),
    } as Query<unknown, unknown>)

    const response = (await mongooseViews.withName(
      name,
    )) as Left<NotFoundExercise>

    expect(viewsFindOne).toHaveBeenCalledWith({ name })
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
