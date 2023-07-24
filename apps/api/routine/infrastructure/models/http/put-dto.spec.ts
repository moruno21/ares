import PutRoutineDto from './put-dto'

describe('PutRoutineDto', () => {
  const name = 'name'
  const description = 'description'
  const workouts = [{ exerciseId: 'exerciseId', reps: 8, sets: 4 }]
  const putDto = PutRoutineDto.with({ description, name, workouts })

  it.concurrent('has a name', () => {
    expect(putDto).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(putDto).toHaveProperty('description')
  })

  it.concurrent('has workouts', () => {
    expect(putDto).toHaveProperty('workouts')
  })

  it.concurrent('can be created', () => {
    expect(putDto.name).toBe(name)
    expect(putDto.description).toBe(description)
    expect(putDto.workouts).toBe(workouts)
  })
})
