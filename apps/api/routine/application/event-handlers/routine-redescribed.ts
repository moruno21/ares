import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import RoutineRedescribed from '~/routine/domain/events/routine-redescribed'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either from '~/shared/either'

import RoutineViews from '../services/views'

@EventsHandler(RoutineRedescribed)
class RoutineRedescribedHandler implements IEventHandler<RoutineRedescribed> {
  constructor(@Inject(RoutineViews) private readonly views: RoutineViews) {}

  async handle(
    event: RoutineRedescribed,
  ): Promise<Either<NotFoundRoutine, void>> {
    const routineView = await this.views.withId(event.id)

    if (Either.isLeft(routineView))
      return Either.left(NotFoundRoutine.withId(event.id))

    await this.views.redescribe(routineView.value.id, event.description)
  }
}

export default RoutineRedescribedHandler
