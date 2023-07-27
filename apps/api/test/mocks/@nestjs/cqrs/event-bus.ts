import { EventBus } from '@nestjs/cqrs'

const EventBusMock = {
  mock: () =>
    ({
      publish: jest.fn((value) => value),
    } as unknown as EventBus),
} as const

export default EventBusMock
