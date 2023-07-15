import EventStorePublisher from '~/shared/eventstore/publisher'

const EventStorePublisherMock = {
  mock: () =>
    ({
      addEventFactories: jest.fn(),
      publish: jest.fn(),
      read: jest.fn(),
      setCategory: jest.fn(),
    } as unknown as EventStorePublisher),
} as const

export default EventStorePublisherMock
