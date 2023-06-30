import { QueryBus } from '@nestjs/cqrs'

const QueryBusMock = {
  mock: () => ({ execute: jest.fn() } as unknown as QueryBus),
} as const

export default QueryBusMock
