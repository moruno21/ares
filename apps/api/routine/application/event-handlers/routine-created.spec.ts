import ExerciseView from '~/exercise/application/models/view'
import ExerciseViews from '~/exercise/application/services/views'
import RoutineCreated from '~/routine/domain/events/routine-created'
import Either from '~/shared/either'
import ExerciseViewsMock from '~/test/mocks/exercise/application/services/views'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'
import UserViewsMock from '~/test/mocks/user/application/services/views'
import UserView from '~/user/application/models/view'
import UserViews from '~/user/application/services/views'

import RoutineView from '../models/view'
import RoutineViews from '../services/views'
import RoutineCreatedHandler from './routine-created'

describe('RoutineCreatedHandler', () => {
  let exerciseViews: ExerciseViews
  let routineViews: RoutineViews
  let userViews: UserViews
  let createdHandler: RoutineCreatedHandler

  beforeEach(() => {
    exerciseViews = ExerciseViewsMock.mock()
    routineViews = RoutineViewsMock.mock()
    userViews = UserViewsMock.mock()
    createdHandler = new RoutineCreatedHandler(
      exerciseViews,
      routineViews,
      userViews,
    )
  })

  it('creates a routine view with routine created', async () => {
    const userId = 'userId'
    const userEmail = 'userEmail'
    const userName = 'userName'
    const userView = UserView.with({
      email: userEmail,
      id: userId,
      name: userName,
    })

    const exerciseId = 'exerciseId'
    const exerciseName = 'exerciseName'
    const exerciseDescription = 'exerciseDescription'
    const exerciseView = ExerciseView.with({
      description: exerciseDescription,
      id: exerciseId,
      name: exerciseName,
    })

    const routineId = 'routineId'
    const routineName = 'routineName'
    const routineDescription = 'routineDescription'
    const routineWorkouts = [
      {
        exerciseId,
        exerciseName,
        reps: 12,
        sets: 3,
      },
    ]

    const exerciseViewsWithId = jest.spyOn(exerciseViews, 'withId')
    const routineViewsAdd = jest.spyOn(routineViews, 'add')
    const usersViewsWithId = jest.spyOn(userViews, 'withId')

    exerciseViewsWithId.mockResolvedValue(Either.right(exerciseView))
    usersViewsWithId.mockResolvedValue(Either.right(userView))

    await createdHandler.handle(
      RoutineCreated.with({
        description: routineDescription,
        id: routineId,
        name: routineName,
        ownerId: userId,
        workouts: routineWorkouts,
      }),
    )

    expect(routineViewsAdd).toHaveBeenCalledWith(
      RoutineView.with({
        description: routineDescription,
        id: routineId,
        name: routineName,
        ownerId: userId,
        workouts: routineWorkouts,
      }),
    )
  })
})
