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
    await this.views.create(MongooseExerciseView.fromExerciseView(view))

    return view
  }

  async delete(view: ExerciseView): Promise<ExerciseView> {
    await this.views.deleteOne({ _id: view.id }).lean().exec()

    return view
  }

  async getAll(): Promise<ExerciseView[]> {
    const mongooseViews = await this.views.find().lean().exec()

    return mongooseViews.map((mongooseView) =>
      MongooseExerciseView.toExerciseView(mongooseView),
    )
  }

  async withId(id: string): Promise<Either<NotFoundExercise, ExerciseView>> {
    const mongooseView = await this.views.findOne({ _id: id }).lean().exec()

    if (!mongooseView) return Either.left(NotFoundExercise.withId(id))

    return Either.right(MongooseExerciseView.toExerciseView(mongooseView))
  }

  async withName(
    name: string,
  ): Promise<Either<NotFoundExercise, ExerciseView>> {
    const mongooseView = await this.views.findOne({ name }).lean().exec()

    if (!mongooseView) return Either.left(NotFoundExercise.withName(name))

    return Either.right(MongooseExerciseView.toExerciseView(mongooseView))
  }
}

export default MongooseExerciseViews
