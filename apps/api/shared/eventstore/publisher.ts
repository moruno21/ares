import { EventStoreDBClient, jsonEvent } from '@eventstore/db-client'
import { Inject, Injectable } from '@nestjs/common'
import { IEvent, IEventPublisher } from '@nestjs/cqrs'

@Injectable()
class EventStorePublisher implements IEventPublisher<IEvent> {
  private category: string
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

  async publish<T extends IEvent>(event: T) {
    let eventData = {}

    for (const prop in event) {
      if (prop === '__name__') continue
      eventData = { ...eventData, [prop]: event[prop] }
    }

    const message = JSON.parse(JSON.stringify(event))
    const id = message.id
    const streamName = `${this.category}-${id}`
    const type = event.constructor.name

    try {
      await this.client.appendToStream(
        streamName,
        jsonEvent({
          data: eventData,
          type,
        }),
      )
    } catch (err) {
      console.trace(err)
    }
  }

  setCategory(category: string) {
    this.category = category
  }

  async read(
    // eslint-disable-next-line @typescript-eslint/ban-types
    aggregate: Function,
    id: string,
  ) {
    const streamName = `${this.category}-${id}`

    try {
      const resolvedEvents = this.client.readStream(streamName)

      const events = [] as IEvent[]

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
    } catch (error) {
      console.trace(error)
    }
    return null
  }
}

export default EventStorePublisher
