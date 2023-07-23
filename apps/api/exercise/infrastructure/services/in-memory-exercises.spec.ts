import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import ExerciseDescription from '~/exercise/domain/models/description'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import ExerciseName from '~/exercise/domain/models/name'
import Either, { Left } from '~/shared/either'

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
    expect(inMemoryExercises).toHaveProperty('save')
    expect(inMemoryExercises).toHaveProperty('withId')
  })

  it('saves an exercise', async () => {
    const exercisesPush = jest.spyOn(exercises, 'push')

    const response = inMemoryExercises.save(exercise)

    expect(exercisesPush).toHaveBeenCalledWith(exercise)
    expect(response).toBe(exercise)
    expect(inMemoryExercises.exercises).toContain(exercise)
  })

  it('finds an exercise by its id', async () => {
    const exercisesFind = jest.spyOn(exercises, 'find')
    exercisesFind.mockReturnValue(exercise)

    const response = await inMemoryExercises.withId(exercise.id)

    expect(response.value).toBe(exercise)
  })

  it('cannot find an exercise that does not exist', async () => {
    const exercisesFind = jest.spyOn(exercises, 'find')
    const notFound = NotFoundExercise.withId(exercise.id.value)

    exercisesFind.mockReturnValue(null)

    const response = (await inMemoryExercises.withId(
      exercise.id,
    )) as Left<NotFoundExercise>

    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
