import { EventPublisher } from '@nestjs/cqrs'

import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import ExerciseDescription from '~/exercise/domain/models/description'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import ExerciseName from '~/exercise/domain/models/name'
import Exercises from '~/exercise/domain/services/exercises'
import { InvalidUuid } from '~/shared/domain'
import Either, { Left } from '~/shared/either'
import EventPublisherMock from '~/test/mocks/@nestjs/cqrs/event-publisher'
import ExercisesMock from '~/test/mocks/exercise/domain/services/exercises'

import DeleteExercise from '../delete-exercise'
import DeleteExerciseHandler from './delete-exercise'

describe('DeleteExerciseHandler', () => {
  let eventPublisher: EventPublisher
  let exercises: Exercises
  let deleteExerciseHandler: DeleteExerciseHandler

  const idValue = '1c681ebb-e97d-45a1-9c0b-95b4b15f2e20'
  const id = ExerciseId.fromString(idValue).value as ExerciseId
  const nameValue = 'name'
  const name = ExerciseName.fromString(nameValue).value as ExerciseName
  const descriptionValue = 'description'
  const description = ExerciseDescription.fromString(descriptionValue)
    .value as ExerciseDescription
  const exercise = Exercise.create({ description, id, name })

  beforeEach(() => {
    eventPublisher = EventPublisherMock.mock()
    exercises = ExercisesMock.mock()
    deleteExerciseHandler = new DeleteExerciseHandler(eventPublisher, exercises)
  })

  it('deletes an exercise from an id', async () => {
    const eventPublisherMergeObjectContext = jest.spyOn(
      eventPublisher,
      'mergeObjectContext',
    )
    const exercisesDelete = jest.spyOn(exercises, 'delete')
    const exercisesFindWithId = jest.spyOn(exercises, 'findWithId')

    exercisesFindWithId.mockResolvedValue(Either.right(exercise))

    const response = await deleteExerciseHandler.execute(
      DeleteExercise.with({
        id: idValue,
      }),
    )

    expect(exercisesFindWithId).toHaveBeenCalledWith(id)
    expect(eventPublisherMergeObjectContext).toHaveBeenCalledWith(exercise)
    expect(exercisesDelete).toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(true)
    expect(response).toStrictEqual(Either.right(exercise))
  })

  it('cannot delete an exercise from an invalid id', async () => {
    const idMock = 'invalidUuid'
    const eventPublisherMergeObjectContext = jest.spyOn(
      eventPublisher,
      'mergeObjectContext',
    )
    const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(idMock)

    const exercisesDelete = jest.spyOn(exercises, 'delete')
    const exercisesFindWithId = jest.spyOn(exercises, 'findWithId')

    const response = (await deleteExerciseHandler.execute(
      DeleteExercise.with({
        id: idMock,
      }),
    )) as Left<InvalidUuid>

    expect(exercisesFindWithId).not.toHaveBeenCalled()
    expect(exercisesDelete).not.toHaveBeenCalled()
    expect(eventPublisherMergeObjectContext).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(invalidUuid.__name__)
    expect(response.value.code).toBe(invalidUuid.code)
  })

  it('cannot delete an exercise that does not exist', async () => {
    const eventPublisherMergeObjectContext = jest.spyOn(
      eventPublisher,
      'mergeObjectContext',
    )
    const notFound = NotFoundExercise.withId(idValue)

    const exercisesDelete = jest.spyOn(exercises, 'delete')
    const exercisesFindWithId = jest.spyOn(exercises, 'findWithId')

    exercisesFindWithId.mockResolvedValue(Either.left(notFound))

    const response = (await deleteExerciseHandler.execute(
      DeleteExercise.with({
        id: idValue,
      }),
    )) as Left<NotFoundExercise>

    expect(exercisesFindWithId).toHaveBeenCalledWith(id)
    expect(exercisesDelete).not.toHaveBeenCalled()
    expect(eventPublisherMergeObjectContext).not.toHaveBeenCalled()
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
