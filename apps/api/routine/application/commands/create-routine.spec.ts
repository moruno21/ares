import { itIsNamed } from '~/test/closures/shared/name-type'

import CreateRoutine from './create-routine'

describe('CreateRoutine', () => {
  const __name__ = 'CreateRoutine'
  const id = 'id'
  const name = 'name'
  const description = 'description'
  const workouts = [{ exerciseId: 'exerciseId', reps: 6, sets: 4 }]
  const createRoutine = CreateRoutine.with({ description, id, name, workouts })

  itIsNamed(createRoutine)

  it.concurrent('has an id', () => {
    expect(createRoutine).toHaveProperty('id')
  })

  it.concurrent('has a name', () => {
    expect(createRoutine).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(createRoutine).toHaveProperty('description')
  })

  it.concurrent('has workouts', () => {
    expect(createRoutine).toHaveProperty('workouts')
  })

  it.concurrent('can be created', () => {
    expect(createRoutine.__name__).toBe(__name__)
    expect(createRoutine.id).toBe(id)
    expect(createRoutine.name).toBe(name)
    expect(createRoutine.description).toBe(description)
    expect(createRoutine.workouts).toBe(workouts)
  })
})
