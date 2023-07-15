import { IEvent, IEventPublisher } from '@nestjs/cqrs'

class EventPublishersHandler {
  private eventPublishers: IEventPublisher[]

  constructor(...eventPublishers: IEventPublisher[]) {
    this.eventPublishers = eventPublishers
  }

  publish(event: IEvent) {
    for (const publisher of this.eventPublishers) {
      publisher.publish(event)
    }
  }
}

export default EventPublishersHandler
