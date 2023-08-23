import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './service'

@ApiTags('auth')
@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() loginDTO: { email: string }) {
    const { email } = loginDTO

    const isValid = await this.authService.validateUser(email)

    if (!isValid) {
      throw new UnauthorizedException()
    }
  }
}
