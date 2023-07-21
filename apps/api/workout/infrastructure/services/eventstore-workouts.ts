import { Injectable } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import { Event } from '~/shared/domain'
import Workout from '~/workout/domain/models/workout'
import Workouts from '~/workout/domain/services/workouts'

@Injectable()
class EventStoreWorkouts implements Workouts {
  constructor(private readonly publisher: EventPublisher<Event>) {}

  save(workout: Workout): Workout {
    this.publisher.mergeObjectContext(workout).commit()
    return workout
  }
}

export default EventStoreWorkouts
