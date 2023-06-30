import ExerciseView from '~/exercise/application/models/view'

import MongooseExerciseView from './view'

describe('MongooseExerciseView', () => {
  const id = 'id'
  const name = 'name'
  const description = 'description'
  const view = ExerciseView.with({ description, id, name })
  const mongooseView = MongooseExerciseView.fromExerciseView(view)

  it.concurrent('has an id', () => {
    expect(mongooseView).toHaveProperty('_id')
  })

  it.concurrent('has a name', () => {
    expect(mongooseView).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(mongooseView).toHaveProperty('description')
  })

  it.concurrent('can be created from view', () => {
    expect(mongooseView._id).toBe(id)
    expect(mongooseView.name).toBe(name)
    expect(mongooseView.description).toBe(description)
  })

  it.concurrent('can be converted to view', () => {
    const convertedView = MongooseExerciseView.toExerciseView(mongooseView)

    expect(convertedView.id).toBe(id)
    expect(convertedView.name).toBe(name)
    expect(convertedView.description).toBe(description)
  })
})
