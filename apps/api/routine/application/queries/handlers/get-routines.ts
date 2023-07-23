import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import RoutineView from '../../models/view'
import RoutineViews from '../../services/views'
import GetRoutines from '../get-routines'

@QueryHandler(GetRoutines)
class GetRoutinesHandler implements IQueryHandler {
  constructor(@Inject(RoutineViews) private readonly views: RoutineViews) {}

  async execute(): Promise<RoutineView[]> {
    return await this.views.getAll()
  }
}

export default GetRoutinesHandler
