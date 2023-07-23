import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import Exercises from '~/exercise/domain/services/exercises'
import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'

import DeleteExercise from '../delete-exercise'

@CommandHandler(DeleteExercise)
class DeleteExerciseHandler implements ICommandHandler {
  constructor(@Inject(Exercises) private readonly exercises: Exercises) {}

  async execute(
    command: DeleteExercise,
  ): Promise<Either<(InvalidUuid | NotFoundExercise)[], Exercise>> {
    const id = ExerciseId.fromString(command.id)
    const isInvalidId = Either.isLeft(id)

    const exercise = !isInvalidId && (await this.exercises.withId(id.value))
    const notFoundExercise = Either.isLeft(exercise)

    const deletedExercise =
      !isInvalidId && !notFoundExercise && exercise.value.delete()
    const notDeletedExercise = Either.isLeft(deletedExercise)

    const exceptions = []
    if (isInvalidId) exceptions.push(id.value)
    if (notFoundExercise) exceptions.push(exercise.value)
    if (notDeletedExercise) exceptions.push(deletedExercise.value)
    if (isInvalidId || notFoundExercise || notDeletedExercise)
      return Either.left(exceptions)

    this.exercises.save(exercise.value)

    return Either.right(exercise.value)
  }
}

export default DeleteExerciseHandler
