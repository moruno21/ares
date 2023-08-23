import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { QueryBus } from '@nestjs/cqrs'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import GetUserByEmail from '~/user/application/queries/get-user-by-email'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private queryBus: QueryBus) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.secret'),
    })
  }

  async validate(payload: { email: string }) {
    const user = await this.queryBus.execute(
      GetUserByEmail.with({ email: payload.email }),
    )

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
