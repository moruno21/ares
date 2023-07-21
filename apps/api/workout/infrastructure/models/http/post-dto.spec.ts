import PostWorkoutDto from './post-dto'

describe('PostWorkoutDto', () => {
  const exerciseId = 'exerciseId'
  const reps = 8
  const sets = 6
  const postDto = PostWorkoutDto.with({ exerciseId, reps, sets })

  it.concurrent('has an exercise id', () => {
    expect(postDto).toHaveProperty('exerciseId')
  })

  it.concurrent('has reps', () => {
    expect(postDto).toHaveProperty('reps')
  })

  it.concurrent('has sets', () => {
    expect(postDto).toHaveProperty('sets')
  })

  it.concurrent('can be created', () => {
    expect(postDto.exerciseId).toBe(exerciseId)
    expect(postDto.reps).toBe(reps)
    expect(postDto.sets).toBe(sets)
  })
})
