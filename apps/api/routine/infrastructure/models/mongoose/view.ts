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

  @Prop()
  readonly workouts: { exerciseId: string; reps: number; sets: number }[]

  constructor(
    _id: string,
    name: string,
    description: string,
    workouts: MongooseRoutineView['workouts'],
  ) {
    this._id = _id
    this.description = description
    this.name = name
    this.workouts = workouts
  }

  static fromRoutineView({ description, id, name, workouts }: RoutineView) {
    return new this(id, name, description, workouts)
  }

  static toRoutineView({
    _id,
    description,
    name,
    workouts,
  }: MongooseRoutineView) {
    return RoutineView.with({
      description,
      id: _id,
      name,
      workouts,
    })
  }
}

export default MongooseRoutineView
