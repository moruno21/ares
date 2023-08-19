import { Inject } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import UserCreated from '~/user/domain/events/user-created'

import UserView from '../models/view'
import UserViews from '../services/views'

@EventsHandler(UserCreated)
class UserCreatedHandler implements IEventHandler<UserCreated> {
  constructor(@Inject(UserViews) private readonly views: UserViews) {}

  async handle(event: UserCreated): Promise<void> {
    await this.views.add(
      UserView.with({
        email: event.email,
        id: event.id,
        name: event.name,
      }),
    )
  }
}

export default UserCreatedHandler
