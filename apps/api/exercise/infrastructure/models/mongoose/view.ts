import { Prop, Schema } from '@nestjs/mongoose'

import ExerciseView from '~/exercise/application/models/view'

@Schema({ versionKey: false })
class MongooseExerciseView implements Omit<ExerciseView, '__name__' | 'id'> {
  @Prop()
  readonly _id: string

  @Prop()
  readonly description: string

  @Prop()
  readonly name: string

  constructor(
    _id: MongooseExerciseView['_id'],
    name: MongooseExerciseView['name'],
    description: MongooseExerciseView['description'],
  ) {
    this._id = _id
    this.description = description
    this.name = name
  }

  static fromExerciseView({ description, id, name }: ExerciseView) {
    return new this(id, name, description)
  }

  static toExerciseView({ _id, description, name }: MongooseExerciseView) {
    return ExerciseView.with({
      description,
      id: _id,
      name,
    })
  }
}

export default MongooseExerciseView
