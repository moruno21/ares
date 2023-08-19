import { EventPublisher } from '@nestjs/cqrs'

import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import RoutineDescription from '~/routine/domain/models/description'
import RoutineId from '~/routine/domain/models/id'
import RoutineName from '~/routine/domain/models/name'
import Routine from '~/routine/domain/models/routine'
import RoutineWorkout from '~/routine/domain/models/workout'
import Either, { Left } from '~/shared/either'
import EventStorePublisher from '~/shared/eventstore/publisher'
import EventPublisherMock from '~/test/mocks/@nestjs/cqrs/event-publisher'
import EventStorePublisherMock from '~/test/mocks/shared/eventstore/publisher'
import UserId from '~/user/domain/models/id'

import EventStoreRoutines from './eventstore-routines'

describe('EventStoreRoutines', () => {
  let eventStorePublisher: EventStorePublisher
  let eventPublisher: EventPublisher
  let routines: EventStoreRoutines

  const idValue = 'f2c38edc-e505-433f-a7a1-4b4a46c69a1e'
  const id = RoutineId.fromString(idValue).value as RoutineId
  const nameValue = 'name'
  const name = RoutineName.fromString(nameValue).value as RoutineName
  const descriptionValue = 'description'
  const description = RoutineDescription.fromString(descriptionValue)
    .value as RoutineDescription
  const ownerIdValue = '8912fc10-ea83-4d60-9d8b-c3249f59bafe'
  const ownerId = UserId.fromString(ownerIdValue).value as UserId
  const workoutsValue = [
    {
      exerciseId: 'ea29a364-177c-4751-bb3b-43bed8cb58e5',
      reps: 4,
      sets: 4,
    },
  ]
  const workouts = workoutsValue.map(
    (workoutValue) =>
      RoutineWorkout.fromValue(workoutValue).value as RoutineWorkout,
  )
  const routine = Routine.create({ description, id, name, ownerId, workouts })

  beforeEach(() => {
    eventStorePublisher = EventStorePublisherMock.mock()
    eventPublisher = EventPublisherMock.mock()
    routines = new EventStoreRoutines(eventPublisher, eventStorePublisher)
  })

  it('is a routines service', () => {
    expect(routines).toHaveProperty('save')
    expect(routines).toHaveProperty('withId')
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

  it('finds a routine by its id', async () => {
    const eventStorePublisherRead = jest.spyOn(eventStorePublisher, 'read')

    eventStorePublisherRead.mockResolvedValue(routine)

    const response = await routines.withId(routine.id)

    expect(eventStorePublisherRead).toHaveBeenCalledWith(Routine, idValue)
    expect(response).toStrictEqual(Either.right(routine))
  })

  it('cannot find a routine that does not exist', async () => {
    const eventStorePublisherRead = jest.spyOn(eventStorePublisher, 'read')
    const notFound = NotFoundRoutine.withId(routine.id.value)

    eventStorePublisherRead.mockResolvedValue(null)

    const response = (await routines.withId(
      routine.id,
    )) as Left<NotFoundRoutine>

    expect(eventStorePublisherRead).toHaveBeenCalledWith(Routine, idValue)
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
