import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import ExerciseView from '~/exercise/application/models/view'
import ExerciseViews from '~/exercise/application/services/views'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import Either from '~/shared/either'

import MongooseExerciseView from '../models/mongoose/view'

@Injectable()
class MongooseExerciseViews implements ExerciseViews {
  constructor(
    @InjectModel(MongooseExerciseView.name)
    private readonly views: Model<MongooseExerciseView>,
  ) {}

  async add(view: ExerciseView): Promise<ExerciseView> {
    const { __name__, id, ...mongooseView } = view

    await this.views.create({
      ...mongooseView,
      _id: id,
    })

    return view
  }

  async withName(
    name: string,
  ): Promise<Either<NotFoundExercise, ExerciseView>> {
    const mongooseView = await this.views.findOne({ name }).lean().exec()

    if (!mongooseView) return Either.left(NotFoundExercise.withName(name))

    const { _id, ...view } = mongooseView

    return Either.right({ ...view, __name__: 'ExerciseView', id: _id })
  }
}

export default MongooseExerciseViews
