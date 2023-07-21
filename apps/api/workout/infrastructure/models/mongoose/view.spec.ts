import WorkoutView from '~/workout/application/models/view'

import MongooseWorkoutView from './view'

describe('MongooseWorkoutView', () => {
  const id = 'id'
  const exerciseId = 'exerciseId'
  const reps = 4
  const sets = 4
  const view = WorkoutView.with({ exerciseId, id, reps, sets })
  const mongooseView = MongooseWorkoutView.fromWorkoutView(view)

  it.concurrent('has an id', () => {
    expect(mongooseView).toHaveProperty('_id')
  })

  it.concurrent('has an exercise id', () => {
    expect(mongooseView).toHaveProperty('exerciseId')
  })

  it.concurrent('has reps', () => {
    expect(mongooseView).toHaveProperty('reps')
  })

  it.concurrent('has sets', () => {
    expect(mongooseView).toHaveProperty('sets')
  })

  it.concurrent('can be created from view', () => {
    expect(mongooseView._id).toBe(id)
    expect(mongooseView.exerciseId).toBe(exerciseId)
    expect(mongooseView.reps).toBe(reps)
    expect(mongooseView.sets).toBe(sets)
  })

  it.concurrent('can be converted to view', () => {
    const convertedView = MongooseWorkoutView.toWorkoutView(mongooseView)

    expect(convertedView.id).toBe(id)
    expect(convertedView.exerciseId).toBe(exerciseId)
    expect(convertedView.reps).toBe(reps)
    expect(convertedView.sets).toBe(sets)
  })
})
