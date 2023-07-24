import RoutineRenamed from '~/routine/domain/events/routine-renamed'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either, { Left } from '~/shared/either'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'

import RoutineView from '../models/view'
import RoutineViews from '../services/views'
import RoutineRenamedHandler from './routine-renamed'

describe('RoutineRenamedHandler', () => {
  let views: RoutineViews
  let renamedHandler: RoutineRenamedHandler

  beforeEach(() => {
    views = RoutineViewsMock.mock()
    renamedHandler = new RoutineRenamedHandler(views)
  })

  it('renames a routine view with routine renamed', async () => {
    const id = 'id'
    const name = 'name'
    const description = 'description'
    const workouts = [
      { exerciseId: '98747d8b-3f2a-4548-b029-ff163b1e8941', reps: 8, sets: 6 },
    ]
    const view = RoutineView.with({ description, id, name, workouts })

    const viewsRename = jest.spyOn(views, 'rename')
    const viewsWithId = jest.spyOn(views, 'withId')

    viewsWithId.mockResolvedValue(Either.right(view))

    const anotherName = 'anotherName'
    await renamedHandler.handle(RoutineRenamed.with({ id, name: anotherName }))

    expect(viewsRename).toHaveBeenCalledWith(id, anotherName)
  })

  it('cannot rename a routine view that does not exist', async () => {
    const id = 'id'
    const notFound = NotFoundRoutine.withId(id)

    const viewsRename = jest.spyOn(views, 'rename')
    const viewsWithId = jest.spyOn(views, 'withId')

    viewsWithId.mockResolvedValue(Either.left(notFound))

    const anotherName = 'anotherName'
    const response = (await renamedHandler.handle(
      RoutineRenamed.with({ id, name: anotherName }),
    )) as Left<NotFoundRoutine>

    expect(viewsRename).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
