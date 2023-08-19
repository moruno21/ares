import { Prop, Schema } from '@nestjs/mongoose'

import RoutineView, {
  RoutineWorkoutView,
} from '~/routine/application/models/view'

@Schema({ versionKey: false })
class MongooseRoutineView implements Omit<RoutineView, '__name__' | 'id'> {
  @Prop()
  readonly _id: string

  @Prop()
  readonly description: string

  @Prop()
  readonly name: string

  @Prop()
  readonly ownerId: string

  @Prop()
  readonly workouts: RoutineWorkoutView[]

  constructor(
    _id: MongooseRoutineView['_id'],
    description: MongooseRoutineView['description'],
    name: MongooseRoutineView['name'],
    ownerId: MongooseRoutineView['ownerId'],
    workouts: MongooseRoutineView['workouts'],
  ) {
    this._id = _id
    this.description = description
    this.name = name
    this.ownerId = ownerId
    this.workouts = workouts
  }

  static fromRoutineView({
    description,
    id,
    name,
    ownerId,
    workouts,
  }: RoutineView) {
    return new this(id, description, name, ownerId, workouts)
  }

  static toRoutineView({
    _id,
    description,
    name,
    ownerId,
    workouts,
  }: MongooseRoutineView) {
    return RoutineView.with({
      description,
      id: _id,
      name,
      ownerId,
      workouts,
    })
  }
}

export default MongooseRoutineView
