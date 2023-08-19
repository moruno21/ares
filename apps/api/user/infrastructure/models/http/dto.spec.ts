import UserView from '~/user/application/models/view'
import UserEmail from '~/user/domain/models/email'
import UserId from '~/user/domain/models/id'
import UserName from '~/user/domain/models/name'
import User from '~/user/domain/models/user'

import UserDto from './dto'

describe('UserDto', () => {
  const idValue = '2fa9cc43-38c2-4c27-b7ad-822d682d5439'
  const id = UserId.fromString(idValue).value as UserId
  const emailValue = 'name@gmail.com'
  const email = UserEmail.fromString(emailValue)
  const nameValue = 'name'
  const name = UserName.fromString(nameValue)

  const dto = UserDto.fromUser(User.create({ email, id, name }))

  it.concurrent('has an id', () => {
    expect(dto).toHaveProperty('id')
  })

  it.concurrent('has a name', () => {
    expect(dto).toHaveProperty('name')
  })

  it.concurrent('has an email', () => {
    expect(dto).toHaveProperty('email')
  })

  it.concurrent('can be created from user', () => {
    expect(dto.id).toBe(idValue)
    expect(dto.name).toBe(nameValue)
    expect(dto.email).toBe(emailValue)
  })

  it.concurrent('can be created from user view', () => {
    const view = UserView.with({
      email: emailValue,
      id: idValue,
      name: nameValue,
    })
    const convertedDto = UserDto.fromUserView(view)

    expect(convertedDto.id).toBe(id.value)
    expect(convertedDto.name).toBe(name.value)
    expect(convertedDto.email).toBe(email.value)
  })
})
