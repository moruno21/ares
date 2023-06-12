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
}

export default MongooseExerciseView
