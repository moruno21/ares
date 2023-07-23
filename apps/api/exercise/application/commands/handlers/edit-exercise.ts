import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import InvalidExerciseDescription from '~/exercise/domain/exceptions/invalid-description'
import InvalidExerciseName from '~/exercise/domain/exceptions/invalid-name'
import NotEditedExercise from '~/exercise/domain/exceptions/not-edited'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import ExerciseDescription from '~/exercise/domain/models/description'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import ExerciseName from '~/exercise/domain/models/name'
import Exercises from '~/exercise/domain/services/exercises'
import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'

import ExerciseViews from '../../services/views'
import EditExercise from '../edit-exercise'

@CommandHandler(EditExercise)
class EditExerciseHandler implements ICommandHandler {
  constructor(
    @Inject(Exercises) private readonly exercises: Exercises,
    @Inject(ExerciseViews) private readonly views: ExerciseViews,
  ) {}

  async execute(
    command: EditExercise,
  ): Promise<
    Either<
      (
        | InvalidUuid
        | InvalidExerciseDescription
        | InvalidExerciseName
        | NotEditedExercise
        | NotFoundExercise
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

    const exerciseWithName =
      !isInvalidName && (await this.views.withName(name.value.value))
    const existsWithName =
      !isInvalidName &&
      Either.isRight(exerciseWithName) &&
      !isInvalidId &&
      exerciseWithName.value.id !== id.value.value

    const exercise = !isInvalidId && (await this.exercises.findWithId(id.value))
    const notFoundExercise = Either.isLeft(exercise)

    const exceptions = []
    if (isInvalidId) exceptions.push(id.value)
    if (isInvalidDescription) exceptions.push(description.value)
    if (isInvalidName) exceptions.push(name.value)
    if (existsWithName)
      exceptions.push(
        NotEditedExercise.causeAlreadyExistsOneWithName(name.value.value),
      )
    if (notFoundExercise) exceptions.push(exercise.value)
    if (
      isInvalidId ||
      isInvalidDescription ||
      isInvalidName ||
      existsWithName ||
      notFoundExercise
    )
      return Either.left(exceptions)

    exercise.value.rename(name.value)
    exercise.value.redescribe(description.value)

    this.exercises.save(exercise.value)

    return Either.right(exercise.value)
  }
}

export default EditExerciseHandler
