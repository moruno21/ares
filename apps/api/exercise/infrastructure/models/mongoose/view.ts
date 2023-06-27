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

  constructor(_id: string, name: string, description: string) {
    this._id = _id
    this.description = description
    this.name = name
  }

  static fromExerciseView(view: ExerciseView) {
    return new this(view.id, view.name, view.description)
  }

  static toExerciseView(view: MongooseExerciseView) {
    return ExerciseView.with({
      description: view.description,
      id: view._id,
      name: view.name,
    })
  }
}

export default MongooseExerciseView
