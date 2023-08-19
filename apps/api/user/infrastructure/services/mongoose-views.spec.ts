import { Model, Query } from 'mongoose'

import Either, { Left } from '~/shared/either'
import MongooseUserViewModelMock from '~/test/mocks/user/infrastructure/models/mongoose/view'
import UserView from '~/user/application/models/view'
import NotFoundUser from '~/user/domain/exceptions/not-found'
import MongooseUserViews from '~/user/infrastructure/services/mongoose-views'

import MongooseUserView from '../models/mongoose/view'

describe('MongooseUserViews', () => {
  let views: Model<MongooseUserView>
  let mongooseViews: MongooseUserViews

  const id = 'fc26b967-9f60-4341-bc6e-7e376ea2fec1'
  const email = 'name@gmail.com'
  const name = 'name'
  const view = UserView.with({ email, id, name })

  beforeEach(() => {
    views = MongooseUserViewModelMock.mock()
    mongooseViews = new MongooseUserViews(views)
  })

  it('is an user views service', () => {
    expect(mongooseViews).toHaveProperty('add')
    expect(mongooseViews).toHaveProperty('getAll')
    expect(mongooseViews).toHaveProperty('withEmail')
    expect(mongooseViews).toHaveProperty('withId')
  })

  it('adds a view', async () => {
    const viewsCreate = jest.spyOn(views, 'create')

    const response = await mongooseViews.add(view)

    expect(viewsCreate).toHaveBeenCalledWith(
      MongooseUserView.fromUserView(view),
    )
    expect(response).toBe(view)
  })

  it('gets all the views', async () => {
    const viewsFind = jest.spyOn(views, 'find')
    const mongooseView = MongooseUserView.fromUserView(view)
    const anotherView = UserView.with({
      email: 'anotherName@gmail.com',
      id: '706b7401-6736-4d66-9665-bf27fb20596f',
      name: 'anotherName',
    })
    const anotherMongooseView = MongooseUserView.fromUserView(anotherView)

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
    const mongooseView = MongooseUserView.fromUserView(view)

    viewsFindOne.mockReturnValue({
      lean: () => ({
        exec: async () => mongooseView,
      }),
    } as Query<unknown, unknown>)

    const response = await mongooseViews.withId(id)

    expect(viewsFindOne).toHaveBeenCalledWith({ _id: id })
    expect(response).toStrictEqual(
      Either.right(MongooseUserView.toUserView(mongooseView)),
    )
  })

  it('cannot find a view if does not exist with id', async () => {
    const viewsFindOne = jest.spyOn(views, 'findOne')
    const notFound = NotFoundUser.withId(id)

    viewsFindOne.mockReturnValue({
      lean: () => ({ exec: async () => null }),
    } as Query<unknown, unknown>)

    const response = (await mongooseViews.withId(id)) as Left<NotFoundUser>

    expect(viewsFindOne).toHaveBeenCalledWith({ _id: id })
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })

  it('finds a view if exists with email', async () => {
    const viewsFindOne = jest.spyOn(views, 'findOne')
    const mongooseView = MongooseUserView.fromUserView(view)

    viewsFindOne.mockReturnValue({
      lean: () => ({
        exec: async () => mongooseView,
      }),
    } as Query<unknown, unknown>)

    const response = await mongooseViews.withEmail(email)

    expect(viewsFindOne).toHaveBeenCalledWith({
      email: { $options: 'i', $regex: email },
    })
    expect(response).toStrictEqual(
      Either.right(MongooseUserView.toUserView(mongooseView)),
    )
  })

  it('cannot find a view if does not exist with email', async () => {
    const viewsFindOne = jest.spyOn(views, 'findOne')
    const notFound = NotFoundUser.withEmail(email)

    viewsFindOne.mockReturnValue({
      lean: () => ({ exec: async () => null }),
    } as Query<unknown, unknown>)

    const response = (await mongooseViews.withEmail(
      email,
    )) as Left<NotFoundUser>

    expect(viewsFindOne).toHaveBeenCalledWith({
      email: { $options: 'i', $regex: email },
    })
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
