import PutExerciseDto from './put-dto'

describe('PutExerciseDto', () => {
  const name = 'name'
  const description = 'description'
  const putDto = PutExerciseDto.with({ description, name })

  it.concurrent('has a name', () => {
    expect(putDto).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(putDto).toHaveProperty('description')
  })

  it.concurrent('can be created', () => {
    expect(putDto.name).toBe(name)
    expect(putDto.description).toBe(description)
  })
})
