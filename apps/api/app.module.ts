import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { LoggerMiddleware } from './middleware/logger'

@Module({
  controllers: [],
  imports: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
