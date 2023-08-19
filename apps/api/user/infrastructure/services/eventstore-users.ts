import { Inject, Injectable } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import { Event } from '~/shared/domain'
import Either from '~/shared/either'
import EventStorePublisher from '~/shared/eventstore/publisher'
import NotFoundUser from '~/user/domain/exceptions/not-found'
import UserId from '~/user/domain/models/id'
import User from '~/user/domain/models/user'
import Users from '~/user/domain/services/users'

@Injectable()
class EventStoreUsers implements Users {
  constructor(
    private readonly publisher: EventPublisher<Event>,
    @Inject(EventStorePublisher)
    private readonly eventStorePublisher: EventStorePublisher,
  ) {}

  save(user: User): User {
    this.publisher.mergeObjectContext(user).commit()
    return user
  }

  async withId(userId: UserId): Promise<Either<NotFoundUser, User>> {
    const user = await this.eventStorePublisher.read(User, userId.value)

    if (!user) return Either.left(NotFoundUser.withId(userId.value))

    return Either.right(user)
  }
}

export default EventStoreUsers
