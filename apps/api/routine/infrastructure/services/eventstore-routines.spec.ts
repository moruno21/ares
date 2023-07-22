import { EventPublisher } from '@nestjs/cqrs'

import RoutineDescription from '~/routine/domain/models/description'
import RoutineId from '~/routine/domain/models/id'
import RoutineName from '~/routine/domain/models/name'
import Routine from '~/routine/domain/models/routine'
import EventPublisherMock from '~/test/mocks/@nestjs/cqrs/event-publisher'

import EventStoreRoutines from './eventstore-routines'

describe('EventStoreRoutines', () => {
  let eventPublisher: EventPublisher
  let routines: EventStoreRoutines

  const idValue = 'f2c38edc-e505-433f-a7a1-4b4a46c69a1e'
  const id = RoutineId.fromString(idValue).value as RoutineId
  const nameValue = 'name'
  const name = RoutineName.fromString(nameValue).value as RoutineName
  const descriptionValue = 'description'
  const description = RoutineDescription.fromString(descriptionValue)
    .value as RoutineDescription
  const routine = Routine.create({ description, id, name })

  beforeEach(() => {
    eventPublisher = EventPublisherMock.mock()
    routines = new EventStoreRoutines(eventPublisher)
  })

  it('is a routines service', () => {
    expect(routines).toHaveProperty('save')
  })

  it('saves a routine', async () => {
    const eventPublisherMergeObjectContext = jest.spyOn(
      eventPublisher,
      'mergeObjectContext',
    )

    const response = routines.save(routine)

    expect(eventPublisherMergeObjectContext).toHaveBeenCalled()
    expect(response).toBe(routine)
  })
})
