import PostRoutineDto from './post-dto'

describe('PostRoutineDto', () => {
  const name = 'name'
  const description = 'description'
  const postDto = PostRoutineDto.with({ description, name })

  it.concurrent('has a name', () => {
    expect(postDto).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(postDto).toHaveProperty('description')
  })

  it.concurrent('can be created', () => {
    expect(postDto.name).toBe(name)
    expect(postDto.description).toBe(description)
  })
})
