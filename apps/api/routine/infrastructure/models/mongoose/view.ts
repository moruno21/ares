import { Prop, Schema } from '@nestjs/mongoose'

import RoutineView from '~/routine/application/models/view'

@Schema({ versionKey: false })
class MongooseRoutineView implements Omit<RoutineView, '__name__' | 'id'> {
  @Prop()
  readonly _id: string

  @Prop()
  readonly description: string

  @Prop()
  readonly name: string

  constructor(_id: string, name: string, description: string) {
    this._id = _id
    this.description = description
    this.name = name
  }

  static fromRoutineView({ description, id, name }: RoutineView) {
    return new this(id, name, description)
  }

  static toRoutineView({ _id, description, name }: MongooseRoutineView) {
    return RoutineView.with({
      description,
      id: _id,
      name,
    })
  }
}

export default MongooseRoutineView
