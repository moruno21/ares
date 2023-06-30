import ExercisePostDto from './post-dto'

describe('ExerciseDto', () => {
  const name = 'name'
  const description = 'description'
  const postDto = ExercisePostDto.with({ description, name })

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
