import RoutineWorkoutRenamed from '~/routine/domain/events/routine-workout-renamed'
import Either from '~/shared/either'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'

import RoutineView from '../models/view'
import RoutineViews from '../services/views'
import RoutineWorkoutRenamedHandler from './routine-workout-renamed'

describe('RoutineWorkoutRenamedHandler', () => {
  let views: RoutineViews
  let workoutRenamedHandler: RoutineWorkoutRenamedHandler

  beforeEach(() => {
    views = RoutineViewsMock.mock()
    workoutRenamedHandler = new RoutineWorkoutRenamedHandler(views)
  })

  it('renames a workout from a routine view with routine workout renamed', async () => {
    const routineId = 'df307313-0b4e-4b17-920d-153cf5f03160'
    const routineName = 'name'
    const routineDescription = 'description'
    const workoutOne = {
      exerciseId: 'exerciseIdOne',
      exerciseName: 'exerciseNameOne',
      reps: 10,
      sets: 4,
    }
    const workoutTwo = {
      exerciseId: 'exerciseIdTwo',
      exerciseName: 'exerciseNameTwo',
      reps: 10,
      sets: 4,
    }
    const routineWorkouts = [workoutOne, workoutTwo]
    const routineView = RoutineView.with({
      description: routineDescription,
      id: routineId,
      name: routineName,
      workouts: routineWorkouts,
    })

    const viewsChangeWorkouts = jest.spyOn(views, 'changeWorkouts')
    const viewsWithId = jest.spyOn(views, 'withId')

    viewsWithId.mockResolvedValue(Either.right(routineView))

    const newExerciseName = 'newExerciseName'

    await workoutRenamedHandler.handle(
      RoutineWorkoutRenamed.with({
        id: routineId,
        workout: {
          exerciseId: workoutOne.exerciseId,
          exerciseName: newExerciseName,
        },
      }),
    )

    expect(viewsChangeWorkouts).toHaveBeenCalledWith(routineId, [
      { ...workoutOne, exerciseName: newExerciseName },
      workoutTwo,
    ])
  })
})
