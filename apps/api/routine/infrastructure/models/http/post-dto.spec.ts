import PostRoutineDto from './post-dto'

describe('PostRoutineDto', () => {
  const name = 'name'
  const description = 'description'
  const workouts = [{ exerciseId: 'exerciseId', reps: 8, sets: 4 }]
  const postDto = PostRoutineDto.with({ description, name, workouts })

  it.concurrent('has a name', () => {
    expect(postDto).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(postDto).toHaveProperty('description')
  })

  it.concurrent('has workouts', () => {
    expect(postDto).toHaveProperty('workouts')
  })

  it.concurrent('can be created', () => {
    expect(postDto.name).toBe(name)
    expect(postDto.description).toBe(description)
    expect(postDto.workouts).toBe(workouts)
  })
})
