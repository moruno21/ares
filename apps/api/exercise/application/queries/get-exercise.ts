import { IQuery } from '@nestjs/cqrs'

class GetExercise implements IQuery {
  private constructor(readonly id: string) {}

  static with({ id }: { id: string }): GetExercise {
    return new this(id)
  }
}

export default GetExercise
