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
      | InvalidExerciseDescription
      | InvalidExerciseName
      | InvalidUuid
      | NotEditedExercise
      | NotFoundExercise,
      Exercise
    >
  > {
    const id = ExerciseId.fromString(command.id)
    if (Either.isLeft(id)) return Either.left(id.value)

    const description = ExerciseDescription.fromString(command.description)
    if (Either.isLeft(description)) return Either.left(description.value)

    const name = ExerciseName.fromString(command.name)
    if (Either.isLeft(name)) return Either.left(name.value)

    const exerciseWithSameName = await this.views.withName(name.value.value)
    if (
      Either.isRight(exerciseWithSameName) &&
      exerciseWithSameName.value.id !== id.value.value
    )
      return Either.left(
        NotEditedExercise.causeAlreadyExistsOneWithName(name.value.value),
      )

    const exercise = await this.exercises.findWithId(id.value)
    if (Either.isLeft(exercise)) return Either.left(exercise.value)

    exercise.value.rename(name.value)
    exercise.value.redescribe(description.value)

    this.exercises.save(exercise.value)

    return Either.right(exercise.value)
  }
}

export default EditExerciseHandler
