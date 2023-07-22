import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import InvalidRoutineDescription from '~/routine/domain/exceptions/invalid-description'
import InvalidRoutineName from '~/routine/domain/exceptions/invalid-name'
import RoutineDescription from '~/routine/domain/models/description'
import RoutineId from '~/routine/domain/models/id'
import RoutineName from '~/routine/domain/models/name'
import Routine from '~/routine/domain/models/routine'
import Routines from '~/routine/domain/services/routines'
import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'

import CreateRoutine from '../create-routine'

@CommandHandler(CreateRoutine)
class CreateRoutineHandler implements ICommandHandler {
  constructor(@Inject(Routines) private readonly routines: Routines) {}

  async execute(
    command: CreateRoutine,
  ): Promise<
    Either<
      (InvalidUuid | InvalidRoutineDescription | InvalidRoutineName)[],
      Routine
    >
  > {
    const id = RoutineId.fromString(command.id)
    const description = RoutineDescription.fromString(command.description)
    const name = RoutineName.fromString(command.name)

    const isInvalidId = Either.isLeft(id)
    const isInvalidDescription = Either.isLeft(description)
    const isInvalidName = Either.isLeft(name)

    const exceptions = []
    if (isInvalidId) exceptions.push(id.value)
    if (isInvalidDescription) exceptions.push(description.value)
    if (isInvalidName) exceptions.push(name.value)
    if (isInvalidId || isInvalidDescription || isInvalidName)
      return Either.left(exceptions)

    const routine = Routine.create({
      description: description.value,
      id: id.value,
      name: name.value,
    })

    this.routines.save(routine)

    return Either.right(routine)
  }
}

export default CreateRoutineHandler
