import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

class PostUserDto {
  @ApiProperty()
  @IsString()
  readonly email: string

  private constructor(email: PostUserDto['email']) {
    this.email = email
  }

  static with({ email }: { email: string }): PostUserDto {
    return new PostUserDto(email)
  }
}

export default PostUserDto
