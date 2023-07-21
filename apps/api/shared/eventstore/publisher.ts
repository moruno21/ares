import { EventStoreDBClient, jsonEvent } from '@eventstore/db-client'
import { Inject, Injectable } from '@nestjs/common'
import { IEventPublisher } from '@nestjs/cqrs'

import Event from '../domain/models/event'

@Injectable()
class EventStorePublisher implements IEventPublisher<Event> {
  private eventFactories: object

  constructor(
    @Inject(EventStoreDBClient) private readonly client: EventStoreDBClient,
  ) {}

  addEventFactories(eventFactories: object) {
    this.eventFactories = {
      ...this.eventFactories,
      ...eventFactories,
    }
  }

  async publish<T extends Event>(event: T) {
    let eventData = {}

    for (const prop in event) {
      if (prop === '_metadata' || prop === '__name__') continue
      eventData = { ...eventData, [prop]: event[prop] }
    }

    const message = JSON.parse(JSON.stringify(event))
    const id = message.id
    const streamName = `${event.stream}-${id}`
    const type = event.constructor.name

    try {
      await this.client.appendToStream(
        streamName,
        jsonEvent({
          data: eventData,
          type,
        }),
      )
    } catch (err) {}
  }

  async read(
    // eslint-disable-next-line @typescript-eslint/ban-types
    aggregate: Function,
    id: string,
  ) {
    const streamName = `${aggregate.name}-${id}`

    try {
      const resolvedEvents = this.client.readStream(streamName)

      const events = [] as Event[]

      for await (const event of resolvedEvents) {
        const eventType = event.event.type
        const data = event.event.data
        events.push(
          this.eventFactories[eventType]({
            ...(data as Record<string, unknown>),
          }),
        )
      }

      const entity = Reflect.construct(aggregate, [])
      entity.loadFromHistory(events)
      return entity
    } catch (error) {}
    return null
  }
}

export default EventStorePublisher
