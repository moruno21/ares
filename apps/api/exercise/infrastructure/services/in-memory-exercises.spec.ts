import ExerciseDescription from '~/exercise/domain/models/description'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import ExerciseName from '~/exercise/domain/models/name'

import InMemoryExercises from './in-memory-exercises'

describe('EventStoreExercises', () => {
  let exercises: Exercise[]
  let inMemoryExercises: InMemoryExercises

  const idValue = 'b0c3c6ef-0615-4215-83d0-ddfdcbc4dde5'
  const id = ExerciseId.fromString(idValue).value as ExerciseId
  const nameValue = 'name'
  const name = ExerciseName.fromString(nameValue).value as ExerciseName
  const descriptionValue = 'description'
  const description = ExerciseDescription.fromString(descriptionValue)
    .value as ExerciseDescription
  const exercise = Exercise.create({ description, id, name })

  beforeEach(() => {
    exercises = []
    inMemoryExercises = InMemoryExercises.withExercises(exercises)
  })

  it('is an exercises service', () => {
    expect(inMemoryExercises).toHaveProperty('add')
  })

  it('adds an exercise', async () => {
    const exercisesPush = jest.spyOn(exercises, 'push')

    const response = await inMemoryExercises.add(exercise)

    expect(exercisesPush).toHaveBeenCalledWith(exercise)
    expect(response).toBe(exercise)
    expect(inMemoryExercises.exercises).toContain(exercise)
  })
})
