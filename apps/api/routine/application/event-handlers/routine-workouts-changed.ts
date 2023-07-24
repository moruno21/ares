import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import RoutineWorkoutsChanged from '~/routine/domain/events/routine-workouts-changed'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either from '~/shared/either'

import RoutineViews from '../services/views'

@EventsHandler(RoutineWorkoutsChanged)
class RoutineWorkoutsChangedHandler
  implements IEventHandler<RoutineWorkoutsChanged>
{
  constructor(@Inject(RoutineViews) private readonly views: RoutineViews) {}

  async handle(
    event: RoutineWorkoutsChanged,
  ): Promise<Either<NotFoundRoutine, void>> {
    const routineView = await this.views.withId(event.id)

    if (Either.isLeft(routineView))
      return Either.left(NotFoundRoutine.withId(event.id))

    await this.views.changeWorkouts(routineView.value.id, event.workouts)
  }
}

export default RoutineWorkoutsChangedHandler
