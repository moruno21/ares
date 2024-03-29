import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import InvalidExerciseDescription from '~/exercise/domain/exceptions/invalid-description'
import InvalidExerciseName from '~/exercise/domain/exceptions/invalid-name'
import NotCreatedExercise from '~/exercise/domain/exceptions/not-created'
import ExerciseDescription from '~/exercise/domain/models/description'
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
    @Inject(ExerciseViews) private readonly views: ExerciseViews,
  ) {}

  async execute(
    command: CreateExercise,
  ): Promise<
    Either<
      (
        | InvalidUuid
        | InvalidExerciseDescription
        | InvalidExerciseName
        | NotCreatedExercise
      )[],
      Exercise
    >
  > {
    const id = ExerciseId.fromString(command.id)
    const isInvalidId = Either.isLeft(id)

    const description = ExerciseDescription.fromString(command.description)
    const isInvalidDescription = Either.isLeft(description)

    const name = ExerciseName.fromString(command.name)
    const isInvalidName = Either.isLeft(name)

    const existsWithName =
      !isInvalidName &&
      Either.isRight(await this.views.withName(name.value.value))

    const exceptions = []
    if (isInvalidId) exceptions.push(id.value)
    if (isInvalidDescription) exceptions.push(description.value)
    if (isInvalidName) exceptions.push(name.value)
    if (existsWithName)
      exceptions.push(
        NotCreatedExercise.causeAlreadyExistsOneWithName(name.value.value),
      )

    if (isInvalidId || isInvalidDescription || isInvalidName || existsWithName)
      return Either.left(exceptions)

    const exercise = Exercise.create({
      description: description.value,
      id: id.value,
      name: name.value,
    })

    this.exercises.save(exercise)

    return Either.right(exercise)
  }
}

export default CreateExerciseHandler
