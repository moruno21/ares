import { itIsNamed } from '~/test/closures/shared/name-type'

import ExerciseRenamed from './exercise-renamed'

describe('ExerciseRenamed', () => {
  const __name__ = 'ExerciseRenamed'
  const id = 'id'
  const name = 'name'
  const exerciseRenamed = ExerciseRenamed.with({ id, name })

  itIsNamed(exerciseRenamed)

  it.concurrent('has an id', () => {
    expect(exerciseRenamed).toHaveProperty('id')
  })

  it.concurrent('has a name', () => {
    expect(exerciseRenamed).toHaveProperty('name')
  })

  it.concurrent('can be created', () => {
    expect(exerciseRenamed.__name__).toBe(__name__)
    expect(exerciseRenamed.id).toBe(id)
    expect(exerciseRenamed.name).toBe(name)
  })
})
