import { Inject } from '@nestjs/common'
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs'

import ExerciseDeleted from '~/exercise/domain/events/exercise-deleted'
import EditRoutine from '~/routine/application/commands/edit-routine'
import RoutineViews from '~/routine/application/services/views'

@EventsHandler(ExerciseDeleted)
class ExerciseDeletedProcessManager implements IEventHandler<ExerciseDeleted> {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(RoutineViews) private readonly routineViews: RoutineViews,
  ) {}

  async handle(event: ExerciseDeleted) {
    const routineViews = await this.routineViews.withExercise(event.id)

    if (routineViews.length < 1) return

    routineViews.map((routineView) =>
      this.commandBus.execute(
        EditRoutine.with({
          description: routineView.description,
          id: routineView.id,
          name: routineView.name,
          workouts: routineView.workouts.filter(
            (workout) => workout.exerciseId !== event.id,
          ),
        }),
      ),
    )
  }
}

export default ExerciseDeletedProcessManager
