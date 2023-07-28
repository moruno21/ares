import RoutineWorkoutRedescribed from '~/routine/domain/events/routine-workout-redescribed'
import Either from '~/shared/either'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'

import RoutineView from '../models/view'
import RoutineViews from '../services/views'
import RoutineWorkoutRedescribedHandler from './routine-workout-redescribed'

describe('RoutineWorkoutRedescribedHandler', () => {
  let views: RoutineViews
  let workoutRenamedHandler: RoutineWorkoutRedescribedHandler

  beforeEach(() => {
    views = RoutineViewsMock.mock()
    workoutRenamedHandler = new RoutineWorkoutRedescribedHandler(views)
  })

  it('redescribed a workout from a routine view with routine workout renamed', async () => {
    const routineId = 'df307313-0b4e-4b17-920d-153cf5f03160'
    const routineName = 'name'
    const routineDescription = 'description'
    const workoutOne = {
      exerciseDescription: 'exerciseDescriptionOne',
      exerciseId: 'exerciseIdOne',
      exerciseName: 'exerciseNameOne',
      reps: 10,
      sets: 4,
    }
    const workoutTwo = {
      exerciseDescription: 'exerciseDescriptionTwo',
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

    const newExerciseDescription = 'newExerciseDescription'

    await workoutRenamedHandler.handle(
      RoutineWorkoutRedescribed.with({
        id: routineId,
        workout: {
          exerciseDescription: newExerciseDescription,
          exerciseId: workoutOne.exerciseId,
        },
      }),
    )

    expect(viewsChangeWorkouts).toHaveBeenCalledWith(routineId, [
      { ...workoutOne, exerciseDescription: newExerciseDescription },
      workoutTwo,
    ])
  })
})
