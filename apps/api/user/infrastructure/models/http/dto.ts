import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import UserView from '~/user/application/models/view'
import User from '~/user/domain/models/user'

class UserDto {
  @ApiProperty()
  @IsString()
  readonly id: string

  @ApiProperty()
  @IsString()
  readonly email: string

  @ApiProperty()
  @IsString()
  readonly name: string

  private constructor(
    id: UserDto['id'],
    email: UserDto['email'],
    name: UserDto['name'],
  ) {
    this.id = id
    this.email = email
    this.name = name
  }

  static fromUser({ email, id, name }: User): UserDto {
    return new this(id.value, email.value, name.value)
  }

  static fromUserView({ email, id, name }: UserView): UserDto {
    return new this(id, email, name)
  }
}

export default UserDto
