import RoutineWorkoutDeleted from '~/routine/domain/events/routine-workout-deleted'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either, { Left } from '~/shared/either'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'

import RoutineView from '../models/view'
import RoutineViews from '../services/views'
import RoutineWorkoutDeletedHandler from './routine-workout-deleted'

describe('RoutineWorkoutDeletedHandler', () => {
  let views: RoutineViews
  let workoutDeletedHandler: RoutineWorkoutDeletedHandler

  beforeEach(() => {
    views = RoutineViewsMock.mock()
    workoutDeletedHandler = new RoutineWorkoutDeletedHandler(views)
  })

  it('deletes a workout from a routine view with routine workout deleted', async () => {
    const exerciseId = 'id'
    const routineId = 'a75a3307-2942-458a-8dbb-f31c0dbab297'
    const routineName = 'name'
    const routineDescription = 'description'
    const workoutOne = {
      exerciseId,
      exerciseName: 'exerciseName',
      reps: 10,
      sets: 4,
    }
    const workoutTwo = {
      exerciseId: 'exerciseId',
      exerciseName: 'exerciseName',
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

    await workoutDeletedHandler.handle(
      RoutineWorkoutDeleted.with({ id: routineId, workout: workoutOne }),
    )

    expect(viewsChangeWorkouts).toHaveBeenCalledWith(routineId, [workoutTwo])
  })

  it('cannot delete a workout from a routine view that does not exist', async () => {
    const id = 'id'
    const notFound = NotFoundRoutine.withId(id)
    const workout = { exerciseId: 'exerciseId', reps: 10, sets: 4 }

    const viewsChangeWorkouts = jest.spyOn(views, 'changeWorkouts')
    const viewsWithId = jest.spyOn(views, 'withId')

    viewsWithId.mockResolvedValue(Either.left(notFound))

    const response = (await workoutDeletedHandler.handle(
      RoutineWorkoutDeleted.with({ id, workout }),
    )) as Left<NotFoundRoutine>

    expect(viewsChangeWorkouts).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
