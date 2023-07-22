import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import RoutineCreated from '~/routine/domain/events/routine-created'

import RoutineView from '../models/view'
import RoutineViews from '../services/views'

@EventsHandler(RoutineCreated)
class RoutineCreatedHandler implements IEventHandler<RoutineCreated> {
  constructor(@Inject(RoutineViews) private readonly views: RoutineViews) {}

  async handle(event: RoutineCreated): Promise<void> {
    await this.views.add(
      RoutineView.with({
        description: event.description,
        id: event.id,
        name: event.name,
      }),
    )
  }
}

export default RoutineCreatedHandler
