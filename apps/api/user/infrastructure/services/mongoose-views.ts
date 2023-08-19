import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import Either from '~/shared/either'
import UserView from '~/user/application/models/view'
import UserViews from '~/user/application/services/views'
import NotFoundUser from '~/user/domain/exceptions/not-found'

import MongooseUserView from '../models/mongoose/view'

@Injectable()
class MongooseUserViews implements UserViews {
  constructor(
    @InjectModel(MongooseUserView.name)
    private readonly views: Model<MongooseUserView>,
  ) {}

  async add(view: UserView): Promise<UserView> {
    await this.views.create(MongooseUserView.fromUserView(view))

    return view
  }

  async getAll(): Promise<UserView[]> {
    const mongooseViews = await this.views.find().lean().exec()

    return mongooseViews.map((mongooseView) =>
      MongooseUserView.toUserView(mongooseView),
    )
  }

  async withEmail(email: string): Promise<Either<NotFoundUser, UserView>> {
    const mongooseView = await this.views
      .findOne({ email: { $options: 'i', $regex: email } })
      .lean()
      .exec()

    if (!mongooseView) return Either.left(NotFoundUser.withEmail(email))

    return Either.right(MongooseUserView.toUserView(mongooseView))
  }

  async withId(id: string): Promise<Either<NotFoundUser, UserView>> {
    const mongooseView = await this.views.findOne({ _id: id }).lean().exec()

    if (!mongooseView) return Either.left(NotFoundUser.withId(id))

    return Either.right(MongooseUserView.toUserView(mongooseView))
  }
}

export default MongooseUserViews
