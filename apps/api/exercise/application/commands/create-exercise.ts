import { ICommand } from '@nestjs/cqrs'

class CreateExercise implements ICommand {
  private constructor(readonly id: string, readonly name: string) {}

  static with({ id, name }: { id: string; name: string }): CreateExercise {
    return new this(id, name)
  }
}

export default CreateExercise
