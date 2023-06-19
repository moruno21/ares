import { IQuery } from '@nestjs/cqrs'

class GetExercises implements IQuery {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static all(): GetExercises {
    return new this()
  }
}

export default GetExercises
