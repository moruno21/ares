import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import RoutineDeleted from '~/routine/domain/events/routine-deleted'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either from '~/shared/either'

import RoutineViews from '../services/views'

@EventsHandler(RoutineDeleted)
class RoutineDeletedHandler implements IEventHandler<RoutineDeleted> {
  constructor(@Inject(RoutineViews) private readonly views: RoutineViews) {}

  async handle(event: RoutineDeleted): Promise<Either<NotFoundRoutine, void>> {
    const routineView = await this.views.withId(event.id)

    if (Either.isLeft(routineView))
      return Either.left(NotFoundRoutine.withId(event.id))

    await this.views.delete(routineView.value.id)
  }
}

export default RoutineDeletedHandler
