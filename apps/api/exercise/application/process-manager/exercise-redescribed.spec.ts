import { EventBus } from '@nestjs/cqrs'

import ExerciseRedescribed from '~/exercise/domain/events/exercise-redescribed'
import RoutineView from '~/routine/application/models/view'
import RoutineViews from '~/routine/application/services/views'
import RoutineWorkoutRedescribed from '~/routine/domain/events/routine-workout-redescribed'
import EventBusMock from '~/test/mocks/@nestjs/cqrs/event-bus'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'

import ExerciseRedescribedProcessManager from './exercise-redescribed'

describe('ExerciseRedescribedProcessManager', () => {
  let eventBus: EventBus
  let views: RoutineViews
  let deletedProcessManager: ExerciseRedescribedProcessManager

  beforeEach(() => {
    eventBus = EventBusMock.mock()
    views = RoutineViewsMock.mock()
    deletedProcessManager = new ExerciseRedescribedProcessManager(
      eventBus,
      views,
    )
  })

  it('redescribes a workout from a routine view with exercise redescribed', async () => {
    const exerciseId = 'exerciseId'
    const routineId = 'id'
    const routineName = 'name'
    const routineDescription = 'description'
    const routineWorkouts = [
      {
        exerciseDescription: 'exerciseDescription',
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

    const newExerciseDescription = 'newExerciseDescription'

    await deletedProcessManager.handle(
      ExerciseRedescribed.with({
        description: newExerciseDescription,
        id: exerciseId,
      }),
    )

    expect(eventBusPublish).toHaveBeenCalledWith(
      RoutineWorkoutRedescribed.with({
        id: routineId,
        workout: { exerciseDescription: newExerciseDescription, exerciseId },
      }).withStream('Routine'),
    )
  })

  it('cannot redescribe a workout from a routine view that does not exist', async () => {
    const id = 'id'

    const viewsWithExercise = jest.spyOn(views, 'withExercise')
    const eventBusPublish = jest.spyOn(eventBus, 'publish')

    viewsWithExercise.mockResolvedValue([])

    const newExerciseDescription = 'newExerciseDescription'

    await deletedProcessManager.handle(
      ExerciseRedescribed.with({ description: newExerciseDescription, id }),
    )

    expect(eventBusPublish).not.toHaveBeenCalled()
  })
})
