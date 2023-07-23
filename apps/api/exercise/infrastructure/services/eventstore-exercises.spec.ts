import { EventPublisher } from '@nestjs/cqrs'

import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import ExerciseDescription from '~/exercise/domain/models/description'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import ExerciseName from '~/exercise/domain/models/name'
import Either, { Left } from '~/shared/either'
import EventStorePublisher from '~/shared/eventstore/publisher'
import EventPublisherMock from '~/test/mocks/@nestjs/cqrs/event-publisher'
import EventStorePublisherMock from '~/test/mocks/shared/eventstore/publisher'

import EventStoreExercises from './eventstore-exercises'

describe('EventStoreExercises', () => {
  let eventStorePublisher: EventStorePublisher
  let eventPublisher: EventPublisher
  let exercises: EventStoreExercises

  const idValue = '2b188398-7ac0-4afb-879e-b4028a7660b0'
  const id = ExerciseId.fromString(idValue).value as ExerciseId
  const nameValue = 'name'
  const name = ExerciseName.fromString(nameValue).value as ExerciseName
  const descriptionValue = 'description'
  const description = ExerciseDescription.fromString(descriptionValue)
    .value as ExerciseDescription
  const exercise = Exercise.create({ description, id, name })

  beforeEach(() => {
    eventStorePublisher = EventStorePublisherMock.mock()
    eventPublisher = EventPublisherMock.mock()
    exercises = new EventStoreExercises(eventPublisher, eventStorePublisher)
  })

  it('is an exercises service', () => {
    expect(exercises).toHaveProperty('save')
    expect(exercises).toHaveProperty('withId')
  })

  it('saves an exercise', async () => {
    const eventPublisherMergeObjectContext = jest.spyOn(
      eventPublisher,
      'mergeObjectContext',
    )

    const response = exercises.save(exercise)

    expect(eventPublisherMergeObjectContext).toHaveBeenCalled()
    expect(response).toBe(exercise)
  })

  it('finds an exercise by its id', async () => {
    const eventStorePublisherRead = jest.spyOn(eventStorePublisher, 'read')

    eventStorePublisherRead.mockResolvedValue(exercise)

    const response = await exercises.withId(exercise.id)

    expect(eventStorePublisherRead).toHaveBeenCalledWith(Exercise, idValue)
    expect(response).toStrictEqual(Either.right(exercise))
  })

  it('cannot find an exercise that does not exist', async () => {
    const eventStorePublisherRead = jest.spyOn(eventStorePublisher, 'read')
    const notFound = NotFoundExercise.withId(exercise.id.value)

    eventStorePublisherRead.mockResolvedValue(null)

    const response = (await exercises.withId(
      exercise.id,
    )) as Left<NotFoundExercise>

    expect(eventStorePublisherRead).toHaveBeenCalledWith(Exercise, idValue)
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
