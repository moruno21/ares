import { EventPublisher } from '@nestjs/cqrs'

const EventPublisherMock = {
  mock: () =>
    ({
      mergeObjectContext: jest.fn((value) => value),
    } as unknown as EventPublisher),
} as const

export default EventPublisherMock
