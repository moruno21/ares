import PutRoutineDto from './put-dto'

describe('PutRoutineDto', () => {
  const name = 'name'
  const description = 'description'
  const ownerId = '4a91caaa-cb8b-4793-9e8a-cf9abe1c80ec'
  const workouts = [{ exerciseId: 'exerciseId', reps: 8, sets: 4 }]
  const putDto = PutRoutineDto.with({ description, name, ownerId, workouts })

  it.concurrent('has a name', () => {
    expect(putDto).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(putDto).toHaveProperty('description')
  })

  it.concurrent('has an ownerId', () => {
    expect(putDto).toHaveProperty('ownerId')
  })

  it.concurrent('has workouts', () => {
    expect(putDto).toHaveProperty('workouts')
  })

  it.concurrent('can be created', () => {
    expect(putDto.name).toBe(name)
    expect(putDto.description).toBe(description)
    expect(putDto.ownerId).toBe(ownerId)
    expect(putDto.workouts).toBe(workouts)
  })
})
