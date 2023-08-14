import RoutineView from '~/routine/application/models/view'

import MongooseRoutineView from './view'

describe('MongooseRoutineView', () => {
  const id = 'id'
  const name = 'name'
  const description = 'description'
  const workouts = [
    {
      exerciseId: 'exerciseId',
      exerciseName: 'exerciseName',
      reps: 12,
      sets: 3,
    },
  ]
  const view = RoutineView.with({ description, id, name, workouts })
  const mongooseView = MongooseRoutineView.fromRoutineView(view)

  it.concurrent('has an id', () => {
    expect(mongooseView).toHaveProperty('_id')
  })

  it.concurrent('has a name', () => {
    expect(mongooseView).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(mongooseView).toHaveProperty('description')
  })

  it.concurrent('has workouts', () => {
    expect(mongooseView).toHaveProperty('workouts')
  })

  it.concurrent('can be created from view', () => {
    expect(mongooseView._id).toBe(id)
    expect(mongooseView.name).toBe(name)
    expect(mongooseView.description).toBe(description)
    expect(mongooseView.workouts).toBe(workouts)
  })

  it.concurrent('can be converted to view', () => {
    const convertedView = MongooseRoutineView.toRoutineView(mongooseView)

    expect(convertedView.id).toBe(id)
    expect(convertedView.name).toBe(name)
    expect(convertedView.workouts).toBe(workouts)
  })
})
