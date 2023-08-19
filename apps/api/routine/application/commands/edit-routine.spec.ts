import { itIsNamed } from '~/test/closures/shared/name-type'

import EditRoutine from './edit-routine'

describe('EditRoutine', () => {
  const __name__ = 'EditRoutine'
  const id = 'id'
  const name = 'name'
  const description = 'description'
  const ownerId = 'ownerId'
  const workouts = [{ exerciseId: 'exerciseId', reps: 6, sets: 4 }]
  const editRoutine = EditRoutine.with({
    description,
    id,
    name,
    ownerId,
    workouts,
  })

  itIsNamed(editRoutine)

  it.concurrent('has an id', () => {
    expect(editRoutine).toHaveProperty('id')
  })

  it.concurrent('has a name', () => {
    expect(editRoutine).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(editRoutine).toHaveProperty('description')
  })

  it.concurrent('has an ownerId', () => {
    expect(editRoutine).toHaveProperty('ownerId')
  })

  it.concurrent('has workouts', () => {
    expect(editRoutine).toHaveProperty('workouts')
  })

  it.concurrent('can be edited', () => {
    expect(editRoutine.__name__).toBe(__name__)
    expect(editRoutine.id).toBe(id)
    expect(editRoutine.name).toBe(name)
    expect(editRoutine.description).toBe(description)
    expect(editRoutine.ownerId).toBe(ownerId)
    expect(editRoutine.workouts).toBe(workouts)
  })
})
