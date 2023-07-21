import { Prop, Schema } from '@nestjs/mongoose'

import WorkoutView from '~/workout/application/models/view'

@Schema({ versionKey: false })
class MongooseWorkoutView implements Omit<WorkoutView, '__name__' | 'id'> {
  @Prop()
  readonly _id: string

  @Prop()
  readonly exerciseId: string

  @Prop()
  readonly reps: number

  @Prop()
  readonly sets: number

  constructor(_id: string, exerciseId: string, reps: number, sets: number) {
    this._id = _id
    this.exerciseId = exerciseId
    this.reps = reps
    this.sets = sets
  }

  static fromWorkoutView({ exerciseId, id, reps, sets }: WorkoutView) {
    return new this(id, exerciseId, reps, sets)
  }

  static toWorkoutView({ _id, exerciseId, reps, sets }: MongooseWorkoutView) {
    return WorkoutView.with({
      exerciseId,
      id: _id,
      reps,
      sets,
    })
  }
}

export default MongooseWorkoutView
