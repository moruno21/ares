import PostRoutineDto from './post-dto'

describe('PostRoutineDto', () => {
  const name = 'name'
  const description = 'description'
  const ownerId = '2cfe34ef-1123-4b88-9ba3-0bb03f2e8ceb'
  const workouts = [{ exerciseId: 'exerciseId', reps: 8, sets: 4 }]
  const postDto = PostRoutineDto.with({ description, name, ownerId, workouts })

  it.concurrent('has a name', () => {
    expect(postDto).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(postDto).toHaveProperty('description')
  })

  it.concurrent('has an ownerId', () => {
    expect(postDto).toHaveProperty('ownerId')
  })

  it.concurrent('has workouts', () => {
    expect(postDto).toHaveProperty('workouts')
  })

  it.concurrent('can be created', () => {
    expect(postDto.name).toBe(name)
    expect(postDto.description).toBe(description)
    expect(postDto.ownerId).toBe(ownerId)
    expect(postDto.workouts).toBe(workouts)
  })
})
