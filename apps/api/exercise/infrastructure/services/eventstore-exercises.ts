import { Inject, Injectable } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import Exercises from '~/exercise/domain/services/exercises'
import { Event } from '~/shared/domain'
import Either from '~/shared/either'
import EventStorePublisher from '~/shared/eventstore/publisher'

@Injectable()
class EventStoreExercises implements Exercises {
  constructor(
    private readonly publisher: EventPublisher<Event>,
    @Inject(EventStorePublisher)
    private readonly eventStorePublisher: EventStorePublisher,
  ) {}

  save(exercise: Exercise): Exercise {
    this.publisher.mergeObjectContext(exercise).commit()
    return exercise
  }

  async withId(
    exerciseId: ExerciseId,
  ): Promise<Either<NotFoundExercise, Exercise>> {
    const exercise = await this.eventStorePublisher.read(
      Exercise,
      exerciseId.value,
    )

    if (!exercise) return Either.left(NotFoundExercise.withId(exerciseId.value))

    return Either.right(exercise)
  }
}

export default EventStoreExercises
