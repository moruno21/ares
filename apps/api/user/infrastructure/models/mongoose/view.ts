import { Prop, Schema } from '@nestjs/mongoose'

import UserView from '~/user/application/models/view'

@Schema({ versionKey: false })
class MongooseUserView implements Omit<UserView, '__name__' | 'id'> {
  @Prop()
  readonly _id: string

  @Prop()
  readonly email: string

  @Prop()
  readonly name: string

  constructor(
    _id: MongooseUserView['_id'],
    email: MongooseUserView['email'],
    name: MongooseUserView['name'],
  ) {
    this._id = _id
    this.email = email
    this.name = name
  }

  static fromUserView({ email, id, name }: UserView) {
    return new this(id, email, name)
  }

  static toUserView({ _id, email, name }: MongooseUserView) {
    return UserView.with({
      email,
      id: _id,
      name,
    })
  }
}

export default MongooseUserView
