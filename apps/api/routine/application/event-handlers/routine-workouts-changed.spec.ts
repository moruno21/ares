import ExerciseView from '~/exercise/application/models/view'
import ExerciseViews from '~/exercise/application/services/views'
import RoutineWorkoutsChanged from '~/routine/domain/events/routine-workouts-changed'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either, { Left } from '~/shared/either'
import ExerciseViewsMock from '~/test/mocks/exercise/application/services/views'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'

import RoutineView from '../models/view'
import RoutineViews from '../services/views'
import RoutineWorkoutsChangedHandler from './routine-workouts-changed'

describe('RoutineWorkoutsChangedHandler', () => {
  let routineViews: RoutineViews
  let exerciseViews: ExerciseViews
  let workoutsChangedHandler: RoutineWorkoutsChangedHandler

  beforeEach(() => {
    exerciseViews = ExerciseViewsMock.mock()
    routineViews = RoutineViewsMock.mock()
    workoutsChangedHandler = new RoutineWorkoutsChangedHandler(
      exerciseViews,
      routineViews,
    )
  })

  it('change workouts of a routine view with routine workouts changed', async () => {
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
    const routineOwnerId = 'routineOwnerId'
    const routineWorkouts = [
      {
        exerciseId,
        exerciseName,
        reps: 8,
        sets: 6,
      },
    ]
    const routineView = RoutineView.with({
      description: routineDescription,
      id: routineId,
      name: routineName,
      ownerId: routineOwnerId,
      workouts: routineWorkouts,
    })

    const exerciseViewsWithId = jest.spyOn(exerciseViews, 'withId')
    const routineViewsChangeWorkouts = jest.spyOn(
      routineViews,
      'changeWorkouts',
    )
    const routineViewsWithId = jest.spyOn(routineViews, 'withId')

    exerciseViewsWithId.mockResolvedValue(Either.right(exerciseView))
    routineViewsWithId.mockResolvedValue(Either.right(routineView))

    const anotherWorkouts = [{ exerciseId, reps: 6, sets: 5 }]

    await workoutsChangedHandler.handle(
      RoutineWorkoutsChanged.with({
        id: routineId,
        workouts: anotherWorkouts,
      }),
    )

    expect(routineViewsChangeWorkouts).toHaveBeenCalledWith(routineId, [
      {
        exerciseId: anotherWorkouts[0].exerciseId,
        exerciseName,
        reps: anotherWorkouts[0].reps,
        sets: anotherWorkouts[0].sets,
      },
    ])
  })

  it('cannot change workouts of a routine view that does not exist', async () => {
    const id = 'id'
    const notFound = NotFoundRoutine.withId(id)

    const routineViewsChangeWorkouts = jest.spyOn(
      routineViews,
      'changeWorkouts',
    )
    const routineViewsWithId = jest.spyOn(routineViews, 'withId')

    routineViewsWithId.mockResolvedValue(Either.left(notFound))

    const anotherWorkouts = [
      { exerciseId: 'ab41543a-9879-4f9b-a23c-aeffa2725feb', reps: 4, sets: 4 },
    ]

    const response = (await workoutsChangedHandler.handle(
      RoutineWorkoutsChanged.with({ id, workouts: anotherWorkouts }),
    )) as Left<NotFoundRoutine>

    expect(routineViewsChangeWorkouts).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
