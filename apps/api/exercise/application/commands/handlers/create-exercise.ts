import { Inject } from '@nestjs/common'
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'

import InvalidExerciseName from '~/exercise/domain/exceptions/invalid-name'
import NotCreatedExercise from '~/exercise/domain/exceptions/not-created'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import ExerciseName from '~/exercise/domain/models/name'
import Exercises from '~/exercise/domain/services/exercises'
import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'

import ExerciseViews from '../../services/views'
import CreateExercise from '../create-exercise'

@CommandHandler(CreateExercise)
class CreateExerciseHandler implements ICommandHandler {
  constructor(
    @Inject(Exercises) private readonly exercises: Exercises,
    private readonly publisher: EventPublisher,
    @Inject(ExerciseViews) private readonly views: ExerciseViews,
  ) {}

  async execute(
    command: CreateExercise,
  ): Promise<
    Either<(InvalidUuid | InvalidExerciseName | NotCreatedExercise)[], Exercise>
  > {
    const id = ExerciseId.fromString(command.id)
    const name = ExerciseName.fromString(command.name)

    const isInvalidId = Either.isLeft(id)
    const isInvalidName = Either.isLeft(name)
    const existsWithName =
      !isInvalidName &&
      Either.isRight(await this.views.withName(name.value.value))

    const exceptions = []
    if (isInvalidId) exceptions.push(id.value)
    if (isInvalidName) exceptions.push(name.value)
    if (existsWithName)
      exceptions.push(
        NotCreatedExercise.causeAlreadyExistsOneWithName(name.value.value),
      )
    if (isInvalidId || isInvalidName || existsWithName)
      return Either.left(exceptions)

    const exercise = this.publisher.mergeObjectContext(
      Exercise.create({ id: id.value, name: name.value }),
    )
    exercise.commit()

    await this.exercises.add(exercise)

    return Either.right(exercise)
  }
}

export default CreateExerciseHandler