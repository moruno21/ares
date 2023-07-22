import { Injectable } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import Routine from '~/routine/domain/models/routine'
import Routines from '~/routine/domain/services/routines'
import { Event } from '~/shared/domain'

@Injectable()
class EventStoreRoutines implements Routines {
  constructor(private readonly publisher: EventPublisher<Event>) {}

  save(routine: Routine): Routine {
    this.publisher.mergeObjectContext(routine).commit()
    return routine
  }
}

export default EventStoreRoutines
