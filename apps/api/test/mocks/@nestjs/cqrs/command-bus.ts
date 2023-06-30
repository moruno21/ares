import { CommandBus } from '@nestjs/cqrs'

const CommandBusMock = {
  mock: () => ({ execute: jest.fn() } as unknown as CommandBus),
} as const

export default CommandBusMock
