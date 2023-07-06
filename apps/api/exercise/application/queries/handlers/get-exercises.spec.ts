import ExerciseViewsMock from '~/test/mocks/exercise/application/services/views'

import ExerciseView from '../../models/view'
import ExerciseViews from '../../services/views'
import GetExercisesHandler from './get-exercises'

describe('GetExercises', () => {
  let views: ExerciseViews
  let getExercisesHandler: GetExercisesHandler
  const id = '2a116797-ec97-43f2-b818-e1f16723c898'
  const name = 'name'
  const description = 'description'

  beforeEach(() => {
    views = ExerciseViewsMock.mock()
    getExercisesHandler = new GetExercisesHandler(views)
  })

  it('gets all the exercises', async () => {
    const viewsGetAll = jest.spyOn(views, 'getAll')

    const exerciseViewOne = ExerciseView.with({ description, id, name })
    const exerciseViewTwo = ExerciseView.with({ description, id, name })

    viewsGetAll.mockResolvedValue([exerciseViewOne, exerciseViewTwo])

    const response = await getExercisesHandler.execute()

    expect(viewsGetAll).toHaveBeenCalled()
    expect(response).toStrictEqual([exerciseViewOne, exerciseViewTwo])
  })

  it('returns empty value when there are no exercises', async () => {
    const viewsGetAll = jest.spyOn(views, 'getAll')

    viewsGetAll.mockResolvedValue([])

    const response = await getExercisesHandler.execute()

    expect(viewsGetAll).toHaveBeenCalled()
    expect(response).toStrictEqual([])
  })
})
