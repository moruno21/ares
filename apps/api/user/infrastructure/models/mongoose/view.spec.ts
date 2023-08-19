import UserView from '~/user/application/models/view'

import MongooseUserView from './view'

describe('MongooseUserView', () => {
  const id = 'id'
  const email = 'name@gmail.com'
  const name = 'name'
  const view = UserView.with({ email, id, name })
  const mongooseView = MongooseUserView.fromUserView(view)

  it.concurrent('has an id', () => {
    expect(mongooseView).toHaveProperty('_id')
  })

  it.concurrent('has an email', () => {
    expect(mongooseView).toHaveProperty('email')
  })

  it.concurrent('has a name', () => {
    expect(mongooseView).toHaveProperty('name')
  })

  it.concurrent('can be created from view', () => {
    expect(mongooseView._id).toBe(id)
    expect(mongooseView.email).toBe(email)
    expect(mongooseView.name).toBe(name)
  })

  it.concurrent('can be converted to view', () => {
    const convertedView = MongooseUserView.toUserView(mongooseView)

    expect(convertedView.id).toBe(id)
    expect(convertedView.email).toBe(email)
    expect(convertedView.name).toBe(name)
  })
})
