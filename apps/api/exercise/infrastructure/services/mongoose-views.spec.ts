import { Model, Query } from 'mongoose'

import ExerciseView from '~/exercise/application/models/view'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import MongooseExerciseViews from '~/exercise/infrastructure/services/mongoose-views'
import Either, { Left } from '~/shared/either'
import MongooseExerciseViewModelMock from '~/test/mocks/exercise/infrastructure/models/mongoose/view'

import MongooseExerciseView from '../models/mongoose/view'

describe('MongooseExerciseViews', () => {
  let views: Model<MongooseExerciseView>
  let mongooseViews: MongooseExerciseViews

  const id = 'f4581979-42df-4bc0-acd8-0d7d7f071072'
  const name = 'name'
  const description = 'description'
  const view = ExerciseView.with({ description, id, name })

  beforeEach(() => {
    views = MongooseExerciseViewModelMock.mock()
    mongooseViews = new MongooseExerciseViews(views)
  })

  it('is an exercise views service', () => {
    expect(mongooseViews).toHaveProperty('add')
    expect(mongooseViews).toHaveProperty('delete')
    expect(mongooseViews).toHaveProperty('getAll')
    expect(mongooseViews).toHaveProperty('redescribe')
    expect(mongooseViews).toHaveProperty('rename')
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

    expect(viewsFindOne).toHaveBeenCalledWith({
      name: { $options: 'i', $regex: name },
    })
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

    expect(viewsFindOne).toHaveBeenCalledWith({
      name: { $options: 'i', $regex: name },
    })
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })

  it('renames a view', async () => {
    const newName = 'newName'
    const viewsUpdateOne = jest.spyOn(views, 'updateOne')

    await mongooseViews.rename(view.id, newName)

    expect(viewsUpdateOne).toHaveBeenCalledWith(
      { _id: view.id },
      { name: newName },
    )
  })

  it('redescribes a view', async () => {
    const newDescription = 'newDescription'
    const viewsUpdateOne = jest.spyOn(views, 'updateOne')

    await mongooseViews.redescribe(view.id, newDescription)

    expect(viewsUpdateOne).toHaveBeenCalledWith(
      { _id: view.id },
      { description: newDescription },
    )
  })

  it('deletes a view', async () => {
    const viewsDeleteOne = jest.spyOn(views, 'deleteOne')

    await mongooseViews.delete(view.id)

    expect(viewsDeleteOne).toHaveBeenCalledWith({ _id: view.id })
  })
})
