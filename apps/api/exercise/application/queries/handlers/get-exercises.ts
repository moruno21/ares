import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import ExerciseView from '../../models/view'
import ExerciseViews from '../../services/views'
import GetExercises from '../get-exercises'

@QueryHandler(GetExercises)
class GetExercisesHandler implements IQueryHandler {
  constructor(@Inject(ExerciseViews) private readonly views: ExerciseViews) {}

  async execute(): Promise<ExerciseView[]> {
    return await this.views.getAll()
  }
}

export default GetExercisesHandler
