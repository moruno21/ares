import { Injectable, Logger } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'

import GetUserByEmail from '~/user/application/queries/get-user-by-email'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(private queryBus: QueryBus) {}

  async validateUser(email: string): Promise<boolean> {
    try {
      const user = await this.queryBus.execute(GetUserByEmail.with({ email }))

      return user
    } catch (e) {
      this.logger.error(`Access error with email ${email}: ${e.message}`)
    }
  }
}
