import { EventPublisher } from '@nestjs/cqrs'

import Either, { Left } from '~/shared/either'
import EventStorePublisher from '~/shared/eventstore/publisher'
import EventPublisherMock from '~/test/mocks/@nestjs/cqrs/event-publisher'
import EventStorePublisherMock from '~/test/mocks/shared/eventstore/publisher'
import NotFoundUser from '~/user/domain/exceptions/not-found'
import UserEmail from '~/user/domain/models/email'
import UserId from '~/user/domain/models/id'
import UserName from '~/user/domain/models/name'
import User from '~/user/domain/models/user'

import EventStoreUsers from './eventstore-users'

describe('EventStoreUsers', () => {
  let eventStorePublisher: EventStorePublisher
  let eventPublisher: EventPublisher
  let users: EventStoreUsers

  const idValue = '7bba92ee-66fc-44a4-b83d-4386cac65527'
  const id = UserId.fromString(idValue).value as UserId
  const emailValue = 'name@gmail.com'
  const email = UserEmail.fromString(emailValue)
  const nameValue = 'name'
  const name = UserName.fromString(nameValue)

  const user = User.create({ email, id, name })

  beforeEach(() => {
    eventStorePublisher = EventStorePublisherMock.mock()
    eventPublisher = EventPublisherMock.mock()
    users = new EventStoreUsers(eventPublisher, eventStorePublisher)
  })

  it('is an users service', () => {
    expect(users).toHaveProperty('save')
    expect(users).toHaveProperty('withId')
  })

  it('saves an user', async () => {
    const eventPublisherMergeObjectContext = jest.spyOn(
      eventPublisher,
      'mergeObjectContext',
    )

    const response = users.save(user)

    expect(eventPublisherMergeObjectContext).toHaveBeenCalled()
    expect(response).toBe(user)
  })

  it('finds an user by its id', async () => {
    const eventStorePublisherRead = jest.spyOn(eventStorePublisher, 'read')

    eventStorePublisherRead.mockResolvedValue(user)

    const response = await users.withId(user.id)

    expect(eventStorePublisherRead).toHaveBeenCalledWith(User, idValue)
    expect(response).toStrictEqual(Either.right(user))
  })

  it('cannot find an user that does not exist', async () => {
    const eventStorePublisherRead = jest.spyOn(eventStorePublisher, 'read')
    const notFound = NotFoundUser.withId(user.id.value)

    eventStorePublisherRead.mockResolvedValue(null)

    const response = (await users.withId(user.id)) as Left<NotFoundUser>

    expect(eventStorePublisherRead).toHaveBeenCalledWith(User, idValue)
    expect(Either.isRight(response)).toBe(false)
    expect(response.value.__name__).toBe(notFound.__name__)
    expect(response.value.code).toBe(notFound.code)
  })
})
