import ExerciseView from '~/exercise/application/models/view'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import InMemoryExerciseViews from '~/exercise/infrastructure/services/in-memory-views'
import Either, { Left } from '~/shared/either'

describe('InMemoryExerciseViews', () => {
  let views: ExerciseView[]
  let inMemoryViews = InMemoryExerciseViews.withViews(views)

  const id = '24b14731-078c-4b7e-ac3d-822e204e0732'
  const name = 'name'
  const description = 'description'
  const view = ExerciseView.with({ description, id, name })

  beforeEach(() => {
    views = []
    inMemoryViews = InMemoryExerciseViews.withViews(views)
  })

  it.concurrent('is an exercise views service', () => {
    expect(inMemoryViews).toHaveProperty('add')
    expect(inMemoryViews).toHaveProperty('delete')
    expect(inMemoryViews).toHaveProperty('getAll')
    expect(inMemoryViews).toHaveProperty('withId')
    expect(inMemoryViews).toHaveProperty('withName')
  })

  it('adds a view', async () => {
    const viewsPush = jest.spyOn(views, 'push')

    const response = await inMemoryViews.add(view)

    expect(viewsPush).toHaveBeenCalledWith(view)
    expect(response).toBe(view)
    expect(inMemoryViews.views).toContain(view)
  })

  it('returns an empty array when trying to get all the views and there are not', async () => {
    const response = await inMemoryViews.getAll()

    expect(response).toStrictEqual([])
  })

  it('gets all the views', async () => {
    await inMemoryViews.add(view)

    const response = await inMemoryViews.getAll()

    expect(response).toStrictEqual([view])
  })

  it('finds a view if exists with id', async () => {
    const viewsFind = jest.spyOn(views, 'find')

    viewsFind.mockReturnValue(view)

    const response = await inMemoryViews.withId(id)

    expect(viewsFind).toHaveBeenCalled()
    expect(response).toStrictEqual(Either.right(view))
  })

  it('cannot find a view if does not exist with id', async () => {
    const viewsFind = jest.spyOn(views, 'find')
    const notFound = NotFoundExercise.withId(id)

    viewsFind.mockReturnValue(undefined)

    const response = (await inMemoryViews.withId(id)) as Left<NotFoundExercise>

    expect(viewsFind).toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })

  it('finds a view if exists with name', async () => {
    const viewsFind = jest.spyOn(views, 'find')

    viewsFind.mockReturnValue(view)

    const response = await inMemoryViews.withName(name)

    expect(viewsFind).toHaveBeenCalled()
    expect(response).toStrictEqual(Either.right(view))
  })

  it('cannot find a view if does not exist with name', async () => {
    const viewsFind = jest.spyOn(views, 'find')
    const notFound = NotFoundExercise.withName(name)

    viewsFind.mockReturnValue(undefined)

    const response = (await inMemoryViews.withName(
      name,
    )) as Left<NotFoundExercise>

    expect(viewsFind).toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })

  it('renames an exercise', async () => {
    await inMemoryViews.add(view)

    const newName = 'newName'

    await inMemoryViews.rename(view.id, newName)

    expect(views[0].name).toBe(newName)
  })

  it('redescribes an exercise', async () => {
    await inMemoryViews.add(view)

    const newDescription = 'newDescription'

    await inMemoryViews.redescribe(view.id, newDescription)

    expect(views[0].description).toBe(newDescription)
  })

  it('deletes an exercise', async () => {
    const viewsFindIndex = jest.spyOn(views, 'findIndex')
    const viewsSplice = jest.spyOn(views, 'splice')

    const mockIndex = 5
    viewsFindIndex.mockReturnValue(mockIndex)

    await inMemoryViews.delete(view.id)

    expect(viewsSplice).toHaveBeenCalledWith(mockIndex, 1)
  })
})
