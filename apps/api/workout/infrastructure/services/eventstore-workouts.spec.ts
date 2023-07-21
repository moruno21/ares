import { EventPublisher } from '@nestjs/cqrs'

import ExerciseId from '~/exercise/domain/models/id'
import EventPublisherMock from '~/test/mocks/@nestjs/cqrs/event-publisher'
import WorkoutId from '~/workout/domain/models/id'
import WorkoutReps from '~/workout/domain/models/reps'
import WorkoutSets from '~/workout/domain/models/sets'
import Workout from '~/workout/domain/models/workout'

import EventStoreWorkouts from './eventstore-workouts'

describe('EventStoreWorkouts', () => {
  let eventPublisher: EventPublisher
  let workouts: EventStoreWorkouts

  const idValue = 'a8b1fccd-bfdf-42b7-b63b-e7ecacfa96a6'
  const id = WorkoutId.fromString(idValue).value as WorkoutId
  const exerciseIdValue = 'dca18e61-9d5f-4d7b-969f-2c8a05928ad2'
  const exerciseId = ExerciseId.fromString(exerciseIdValue).value as ExerciseId
  const repsValue = 10
  const reps = WorkoutReps.fromNumber(repsValue).value as WorkoutReps
  const setsValue = 5
  const sets = WorkoutSets.fromNumber(setsValue).value as WorkoutSets
  const workout = Workout.create({ exerciseId, id, reps, sets })

  beforeEach(() => {
    eventPublisher = EventPublisherMock.mock()
    workouts = new EventStoreWorkouts(eventPublisher)
  })

  it('is a workout service', () => {
    expect(workouts).toHaveProperty('save')
  })

  it('saves a workout', async () => {
    const eventPublisherMergeObjectContext = jest.spyOn(
      eventPublisher,
      'mergeObjectContext',
    )

    const response = workouts.save(workout)

    expect(eventPublisherMergeObjectContext).toHaveBeenCalled()
    expect(response).toBe(workout)
  })
})
