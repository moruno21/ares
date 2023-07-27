import { EventBus } from '@nestjs/cqrs'

import ExerciseRenamed from '~/exercise/domain/events/exercise-renamed'
import RoutineView from '~/routine/application/models/view'
import RoutineViews from '~/routine/application/services/views'
import RoutineWorkoutRenamed from '~/routine/domain/events/routine-workout-renamed'
import EventBusMock from '~/test/mocks/@nestjs/cqrs/event-bus'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'

import ExerciseRenamedProcessManager from './exercise-renamed'

describe('ExerciseRenamedProcessManager', () => {
  let eventBus: EventBus
  let views: RoutineViews
  let deletedProcessManager: ExerciseRenamedProcessManager

  beforeEach(() => {
    eventBus = EventBusMock.mock()
    views = RoutineViewsMock.mock()
    deletedProcessManager = new ExerciseRenamedProcessManager(eventBus, views)
  })

  it('renames a workout from a routine view with exercise renamed', async () => {
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

    const newExerciseName = 'newExerciseName'

    await deletedProcessManager.handle(
      ExerciseRenamed.with({ id: exerciseId, name: newExerciseName }),
    )

    expect(eventBusPublish).toHaveBeenCalledWith(
      RoutineWorkoutRenamed.with({
        id: routineId,
        workout: { exerciseId, exerciseName: newExerciseName },
      }).withStream('Routine'),
    )
  })

  it('cannot rename a workout from a routine view that does not exist', async () => {
    const id = 'id'

    const viewsWithExercise = jest.spyOn(views, 'withExercise')
    const eventBusPublish = jest.spyOn(eventBus, 'publish')

    viewsWithExercise.mockResolvedValue([])

    const newExerciseName = 'newExerciseName'

    await deletedProcessManager.handle(
      ExerciseRenamed.with({ id, name: newExerciseName }),
    )

    expect(eventBusPublish).not.toHaveBeenCalled()
  })
})
