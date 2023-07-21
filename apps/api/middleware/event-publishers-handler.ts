import { IEventPublisher } from '@nestjs/cqrs'

import { Event } from '~/shared/domain'

class EventPublishersHandler {
  private eventPublishers: IEventPublisher<Event>[]

  constructor(...eventPublishers: IEventPublisher<Event>[]) {
    this.eventPublishers = eventPublishers
  }

  publish(event) {
    for (const publisher of this.eventPublishers) {
      publisher.publish(event)
    }
  }
}

export default EventPublishersHandler
