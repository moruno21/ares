import { CommandBus } from '@nestjs/cqrs'

import ExerciseDeleted from '~/exercise/domain/events/exercise-deleted'
import EditRoutine from '~/routine/application/commands/edit-routine'
import RoutineView from '~/routine/application/models/view'
import RoutineViews from '~/routine/application/services/views'
import CommandBusMock from '~/test/mocks/@nestjs/cqrs/command-bus'
import RoutineViewsMock from '~/test/mocks/routine/application/services/views'

import ExerciseDeletedProcessManager from './exercise-deleted'

describe('ExerciseDeletedProcessManager', () => {
  let commandBus: CommandBus
  let views: RoutineViews
  let deletedProcessManager: ExerciseDeletedProcessManager

  beforeEach(() => {
    commandBus = CommandBusMock.mock()
    views = RoutineViewsMock.mock()
    deletedProcessManager = new ExerciseDeletedProcessManager(commandBus, views)
  })

  it('deletes a workout with certain exercise id from a routine view with exercise deleted', async () => {
    const exerciseId = 'id'
    const routineId = '394a7d41-6ffb-4d40-bf94-f64c396de439'
    const routineName = 'name'
    const routineDescription = 'description'
    const routineWorkouts = [{ exerciseId, reps: 10, sets: 4 }]
    const routineView = RoutineView.with({
      description: routineDescription,
      id: routineId,
      name: routineName,
      workouts: routineWorkouts,
    })

    const commandBusExecute = jest.spyOn(commandBus, 'execute')
    const viewsWithExercise = jest.spyOn(views, 'withExercise')

    viewsWithExercise.mockResolvedValue([routineView])

    await deletedProcessManager.handle(ExerciseDeleted.with({ id: exerciseId }))

    expect(commandBusExecute).toHaveBeenCalledTimes(1)
    expect(commandBusExecute).toHaveBeenCalledWith(
      EditRoutine.with({
        description: routineDescription,
        id: routineId,
        name: routineName,
        workouts: [],
      }),
    )
  })
})
