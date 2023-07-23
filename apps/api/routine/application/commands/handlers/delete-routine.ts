import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import RoutineId from '~/routine/domain/models/id'
import Routine from '~/routine/domain/models/routine'
import Routines from '~/routine/domain/services/routines'
import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'

import DeleteRoutine from '../delete-routine'

@CommandHandler(DeleteRoutine)
class DeleteRoutineHandler implements ICommandHandler {
  constructor(@Inject(Routines) private readonly routines: Routines) {}

  async execute(
    command: DeleteRoutine,
  ): Promise<Either<(InvalidUuid | NotFoundRoutine)[], Routine>> {
    const id = RoutineId.fromString(command.id)
    const isInvalidId = Either.isLeft(id)

    const routine = !isInvalidId && (await this.routines.findWithId(id.value))
    const notFoundRoutine = Either.isLeft(routine)

    const deletedRoutine =
      !isInvalidId && !notFoundRoutine && routine.value.delete()
    const notDeletedRoutine = Either.isLeft(deletedRoutine)

    const exceptions = []
    if (isInvalidId) exceptions.push(id.value)
    if (notFoundRoutine) exceptions.push(routine.value)
    if (notDeletedRoutine) exceptions.push(deletedRoutine.value)
    if (isInvalidId || notFoundRoutine || notDeletedRoutine)
      return Either.left(exceptions)

    this.routines.save(routine.value)

    return Either.right(routine.value)
  }
}

export default DeleteRoutineHandler
