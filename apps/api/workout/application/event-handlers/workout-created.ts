import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import WorkoutCreated from '~/workout/domain/events/workout-created'

import WorkoutView from '../models/view'
import WorkoutViews from '../services/views'

@EventsHandler(WorkoutCreated)
class WorkoutCreatedHandler implements IEventHandler<WorkoutCreated> {
  constructor(@Inject(WorkoutViews) private readonly views: WorkoutViews) {}

  async handle(event: WorkoutCreated): Promise<void> {
    await this.views.add(
      WorkoutView.with({
        exerciseId: event.exerciseId,
        id: event.id,
        reps: event.reps,
        sets: event.sets,
      }),
    )
  }
}

export default WorkoutCreatedHandler
