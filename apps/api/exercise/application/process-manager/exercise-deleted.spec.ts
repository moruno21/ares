import { EventBus } from '@nestjs/cqrs'

import ExerciseDeleted from '~/exercise/domain/events/exercise-deleted'
import RoutineView from '~/routine/application/models/view'
import RoutineViews from '~/routine/application/services/views'
import RoutineWorkoutDeleted from '~/routine/domain/events/routine-workout-deleted'
import EventBusMock from '~/test/mocks/@nestjs/cqrs/event-bus'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'

import ExerciseDeletedProcessManager from './exercise-deleted'

describe('ExerciseDeletedProcessManager', () => {
  let eventBus: EventBus
  let views: RoutineViews
  let deletedProcessManager: ExerciseDeletedProcessManager

  beforeEach(() => {
    eventBus = EventBusMock.mock()
    views = RoutineViewsMock.mock()
    deletedProcessManager = new ExerciseDeletedProcessManager(eventBus, views)
  })

  it('deletes a workout from a routine view with exercise deleted', async () => {
    const exerciseId = 'exerciseId'
    const routineId = 'id'
    const routineName = 'name'
    const routineDescription = 'description'
    const routineWorkouts = [
      {
        exerciseId,
        exerciseName: 'exerciseName',
        reps: 6,
        sets: 3,
      },
    ]
    const routineView = RoutineView.with({
      description: routineDescription,
      id: routineId,
      name: routineName,
      workouts: routineWorkouts,
    })

    const viewsWithExercise = jest.spyOn(views, 'withExercise')
    const eventBusPublish = jest.spyOn(eventBus, 'publish')

    viewsWithExercise.mockResolvedValue([routineView])

    await deletedProcessManager.handle(ExerciseDeleted.with({ id: exerciseId }))

    expect(eventBusPublish).toHaveBeenCalledWith(
      RoutineWorkoutDeleted.with({
        id: routineId,
        workout: { exerciseId },
      }).withStream('Routine'),
    )
  })

  it('cannot delete a workout from a routine view that does not exist', async () => {
    const id = 'id'

    const viewsWithExercise = jest.spyOn(views, 'withExercise')
    const eventBusPublish = jest.spyOn(eventBus, 'publish')

    viewsWithExercise.mockResolvedValue([])

    await deletedProcessManager.handle(ExerciseDeleted.with({ id }))

    expect(eventBusPublish).not.toHaveBeenCalled()
  })
})
