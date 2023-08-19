import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import UserView from '../../models/view'
import UserViews from '../../services/views'
import GetUsers from '../get-users'

@QueryHandler(GetUsers)
class GetUsersHandler implements IQueryHandler {
  constructor(@Inject(UserViews) private readonly views: UserViews) {}

  async execute(): Promise<UserView[]> {
    return await this.views.getAll()
  }
}

export default GetUsersHandler
