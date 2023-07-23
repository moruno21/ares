import { Inject, Injectable } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import RoutineId from '~/routine/domain/models/id'
import Routine from '~/routine/domain/models/routine'
import Routines from '~/routine/domain/services/routines'
import { Event } from '~/shared/domain'
import Either from '~/shared/either'
import EventStorePublisher from '~/shared/eventstore/publisher'

@Injectable()
class EventStoreRoutines implements Routines {
  constructor(
    private readonly publisher: EventPublisher<Event>,
    @Inject(EventStorePublisher)
    private readonly eventStorePublisher: EventStorePublisher,
  ) {}

  async findWithId(
    routineId: RoutineId,
  ): Promise<Either<NotFoundRoutine, Routine>> {
    const routine = await this.eventStorePublisher.read(
      Routine,
      routineId.value,
    )

    if (!routine) return Either.left(NotFoundRoutine.withId(routineId.value))

    return Either.right(routine)
  }

  save(routine: Routine): Routine {
    this.publisher.mergeObjectContext(routine).commit()
    return routine
  }
}

export default EventStoreRoutines
