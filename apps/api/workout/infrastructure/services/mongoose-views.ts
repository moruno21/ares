import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import WorkoutView from '~/workout/application/models/view'
import WorkoutViews from '~/workout/application/services/views'

import MongooseWorkoutView from '../models/mongoose/view'

@Injectable()
class MongooseWorkoutViews implements WorkoutViews {
  constructor(
    @InjectModel(MongooseWorkoutView.name)
    private readonly views: Model<MongooseWorkoutView>,
  ) {}

  async add(view: WorkoutView): Promise<WorkoutView> {
    await this.views.create(MongooseWorkoutView.fromWorkoutView(view))

    return view
  }
}

export default MongooseWorkoutViews
