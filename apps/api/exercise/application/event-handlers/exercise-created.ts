import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import ExerciseCreated from '~/exercise/domain/events/exercise-created'

import ExerciseViews from '../services/views'

@EventsHandler(ExerciseCreated)
class ExerciseCreatedHandler implements IEventHandler<ExerciseCreated> {
  constructor(@Inject(ExerciseViews) private readonly views: ExerciseViews) {}

  async handle(event: ExerciseCreated): Promise<void> {
    await this.views.add({
      __name__: 'ExerciseView',
      id: event.id,
      name: event.name,
    })
  }
}

export default ExerciseCreatedHandler
