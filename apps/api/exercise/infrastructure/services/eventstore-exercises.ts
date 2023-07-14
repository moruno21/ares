import {
  EventStoreDBClient,
  jsonEvent,
  NO_STREAM,
  STREAM_EXISTS,
} from '@eventstore/db-client'
import { Inject, Injectable } from '@nestjs/common'
import { IEvent } from '@nestjs/cqrs'

import ExerciseCreated from '~/exercise/domain/events/exercise-created'
import ExerciseDeleted from '~/exercise/domain/events/exercise-deleted'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import Exercises from '~/exercise/domain/services/exercises'
import Either from '~/shared/either'

const eventFactory = {
  ExerciseCreated: ({
    description,
    id,
    name,
  }: {
    description: string
    id: string
    name: string
  }) => ExerciseCreated.with({ description, id, name }),
  ExerciseDeleted: ({ id }: { id: string }) => ExerciseDeleted.with({ id }),
}

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
          description: exercise.description.value,
          id: exercise.id.value,
          name: exercise.name.value,
        },
        type: ExerciseCreated.name,
      }),
      { expectedRevision: NO_STREAM },
    )

    return exercise
  }

  async delete(exercise: Exercise): Promise<Exercise> {
    await this.client.appendToStream(
      `${Exercise.name}-${exercise.id.value}`,
      jsonEvent({
        data: {
          id: exercise.id.value,
        },
        type: ExerciseDeleted.name,
      }),
      { expectedRevision: STREAM_EXISTS },
    )

    return exercise
  }

  async findWithId(
    exerciseId: ExerciseId,
  ): Promise<Either<NotFoundExercise, Exercise>> {
    const streamName = `Exercise-${exerciseId.value}`

    try {
      const resolvedEvents = this.client.readStream(streamName)

      const events = [] as IEvent[]

      for await (const event of resolvedEvents) {
        const eventType = event.event.type
        const data = event.event.data
        events.push(
          eventFactory[eventType]({ ...(data as Record<string, unknown>) }),
        )
      }

      const entity = Reflect.construct(Exercise, [])
      entity.loadFromHistory(events)

      return Either.right(entity)
    } catch (error) {
      return Either.left(NotFoundExercise.withId(exerciseId.value))
    }
  }
}

export default EventStoreExercises
