import { ICommand } from '@nestjs/cqrs'

class CreateExercise implements ICommand {
  private constructor(
    readonly id: string,
    readonly description: string,
    readonly name: string,
  ) {}

  static with({
    description,
    id,
    name,
  }: {
    description: string
    id: string
    name: string
  }): CreateExercise {
    return new this(id, description, name)
  }
}

export default CreateExercise
