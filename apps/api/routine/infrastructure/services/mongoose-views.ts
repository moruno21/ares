import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import RoutineView, {
  RoutineWorkoutView,
} from '~/routine/application/models/view'
import RoutineViews from '~/routine/application/services/views'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either from '~/shared/either'

import MongooseRoutineView from '../models/mongoose/view'

@Injectable()
class MongooseRoutineViews implements RoutineViews {
  constructor(
    @InjectModel(MongooseRoutineView.name)
    private readonly views: Model<MongooseRoutineView>,
  ) {}

  async add(view: RoutineView): Promise<RoutineView> {
    await this.views.create(MongooseRoutineView.fromRoutineView(view))

    return view
  }

  async changeWorkouts(
    id: string,
    workouts: RoutineWorkoutView[],
  ): Promise<void> {
    await this.views.updateOne({ _id: id }, { workouts }).lean().exec()
  }

  async delete(id: string): Promise<void> {
    await this.views.deleteOne({ _id: id }).lean().exec()
  }

  async getAll(): Promise<RoutineView[]> {
    const mongooseViews = await this.views.find().lean().exec()

    return mongooseViews.map((mongooseView) =>
      MongooseRoutineView.toRoutineView(mongooseView),
    )
  }

  async redescribe(id: string, description: string): Promise<void> {
    await this.views.updateOne({ _id: id }, { description }).lean().exec()
  }

  async rename(id: string, name: string): Promise<void> {
    await this.views.updateOne({ _id: id }, { name }).lean().exec()
  }

  async withExercise(id: string): Promise<RoutineView[]> {
    const mongooseViews = await this.views
      .find({ workouts: { $elemMatch: { exerciseId: id } } })
      .lean()
      .exec()

    return mongooseViews.map((mongooseView) =>
      MongooseRoutineView.toRoutineView(mongooseView),
    )
  }

  async withId(id: string): Promise<Either<NotFoundRoutine, RoutineView>> {
    const mongooseView = await this.views.findOne({ _id: id }).lean().exec()

    if (!mongooseView) return Either.left(NotFoundRoutine.withId(id))

    return Either.right(MongooseRoutineView.toRoutineView(mongooseView))
  }

  async withOwnerId(id: string): Promise<RoutineView[]> {
    const mongooseViews = await this.views.find({ ownerId: id }).lean().exec()

    return mongooseViews.map((mongooseView) =>
      MongooseRoutineView.toRoutineView(mongooseView),
    )
  }
}

export default MongooseRoutineViews
