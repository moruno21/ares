import ExercisePutDto from './put-dto'

describe('ExerciseDto', () => {
  const name = 'name'
  const description = 'description'
  const putDto = ExercisePutDto.with({ description, name })

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
