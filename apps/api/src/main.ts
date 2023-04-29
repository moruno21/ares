import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'

const GLOBAL_PREFIX = 'api'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'development'
        ? ['debug', 'error', 'log', 'verbose', 'warn']
        : ['log', 'error', 'warn'],
  })
  app.setGlobalPrefix(GLOBAL_PREFIX)

  const port = process.env.PORT || 3333
  await app.listen(port)
  Logger.log(`Listening at: http://localhost:${port}/${GLOBAL_PREFIX}`)
}

bootstrap()
