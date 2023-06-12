import { EventStoreDBClient, jsonEvent, NO_STREAM } from '@eventstore/db-client'
import { Inject, Injectable } from '@nestjs/common'

import ExerciseCreated from '~/exercise/domain/events/exercise-created'
import Exercise from '~/exercise/domain/models/exercise'
import Exercises from '~/exercise/domain/services/exercises'

@Injectable()
class EventStoreExercises implements Exercises {
  constructor(
    @Inject(EventStoreDBClient) private readonly client: EventStoreDBClient,
  ) {}

  async add(exercise: Exercise): Promise<Exercise> {
    await this.client.appendToStream(
      `${Exercise.name}-${exercise.id.value}`,
      jsonEvent({
        data: {
          id: exercise.id.value,
          name: exercise.name.value,
        },
        type: ExerciseCreated.name,
      }),
      { expectedRevision: NO_STREAM },
    )

    return exercise
  }
}

export default EventStoreExercises
