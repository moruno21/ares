import { Inject } from '@nestjs/common'
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'

import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import Exercises from '~/exercise/domain/services/exercises'
import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'

import DeleteExercise from '../delete-exercise'

@CommandHandler(DeleteExercise)
class DeleteExerciseHandler implements ICommandHandler {
  constructor(
    private readonly publisher: EventPublisher,
    @Inject(Exercises) private readonly exercises: Exercises,
  ) {}

  async execute(
    command: DeleteExercise,
  ): Promise<Either<InvalidUuid | NotFoundExercise, Exercise>> {
    const id = ExerciseId.fromString(command.id)

    const isInvalidId = Either.isLeft(id)
    if (isInvalidId) return Either.left(id.value)

    const exercise = await this.exercises.findWithId(id.value)
    if (Either.isLeft(exercise)) return Either.left(exercise.value)

    const deleteExercise = exercise.value.delete()
    if (Either.isLeft(deleteExercise)) return Either.left(deleteExercise.value)

    this.publisher.mergeObjectContext(exercise.value).commit()
    await this.exercises.delete(exercise.value)

    return Either.right(exercise.value)
  }
}

export default DeleteExerciseHandler
