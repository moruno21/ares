import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import RoutineView from '~/routine/application/models/view'
import RoutineViews from '~/routine/application/services/views'

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
}

export default MongooseRoutineViews
