import { EventStoreDBClient, jsonEvent, NO_STREAM } from '@eventstore/db-client'

import ExerciseCreated from '~/exercise/domain/events/exercise-created'
import ExerciseDescription from '~/exercise/domain/models/description'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import ExerciseName from '~/exercise/domain/models/name'
import EventStoreDBClientMock from '~/test/mocks/@eventstore/db-client'

import EventStoreExercises from './eventstore-exercises'

describe('EventStoreExercises', () => {
  let client: EventStoreDBClient
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
    client = EventStoreDBClientMock.mock()
    exercises = new EventStoreExercises(client)
  })

  it('is an exercises service', () => {
    expect(exercises).toHaveProperty('add')
  })

  it('adds an exercise', async () => {
    const clientAppendToStream = jest.spyOn(client, 'appendToStream')

    clientAppendToStream.mockResolvedValue({
      nextExpectedRevision: BigInt(1),
      success: true,
    })

    const response = await exercises.add(exercise)

    expect(clientAppendToStream).toHaveBeenCalledWith(
      `${Exercise.name}-${exercise.id.value}`,
      jsonEvent({
        data: {
          description: exercise.description.value,
          id: exercise.id.value,
          name: exercise.name.value,
        },
        id: expect.anything(),
        type: ExerciseCreated.name,
      }),
      { expectedRevision: NO_STREAM },
    )
    expect(response).toBe(exercise)
  })
})
