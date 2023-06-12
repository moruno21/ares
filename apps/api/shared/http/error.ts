import { ApiProperty } from '@nestjs/swagger'

import { Exception } from '~/shared/domain'
import NameType from '~/shared/named-type'

type Error = Readonly<{
  code: number | string
  message: string
  name: string
}>

class HttpError {
  @ApiProperty()
  readonly errors: Error[]

  private constructor(errors: Error[]) {
    this.errors = errors
  }

  static fromExceptions(exceptions: NameType<Exception, string>[]): HttpError {
    return new this(
      exceptions.map((exception) => ({
        code: exception.code,
        message: exception.message,
        name: exception.__name__,
      })),
    )
  }
}

export default HttpError
