import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import RoutineRenamed from '~/routine/domain/events/routine-renamed'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either from '~/shared/either'

import RoutineViews from '../services/views'

@EventsHandler(RoutineRenamed)
class RoutineRenamedHandler implements IEventHandler<RoutineRenamed> {
  constructor(@Inject(RoutineViews) private readonly views: RoutineViews) {}

  async handle(event: RoutineRenamed): Promise<Either<NotFoundRoutine, void>> {
    const routineView = await this.views.withId(event.id)

    if (Either.isLeft(routineView))
      return Either.left(NotFoundRoutine.withId(event.id))

    await this.views.rename(routineView.value.id, event.name)
  }
}

export default RoutineRenamedHandler
