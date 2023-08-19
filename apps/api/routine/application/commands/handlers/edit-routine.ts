import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import ExerciseId from '~/exercise/domain/models/id'
import Exercises from '~/exercise/domain/services/exercises'
import InvalidRoutineDescription from '~/routine/domain/exceptions/invalid-description'
import InvalidRoutineName from '~/routine/domain/exceptions/invalid-name'
import InvalidWorkoutReps from '~/routine/domain/exceptions/invalid-reps'
import InvalidWorkoutSets from '~/routine/domain/exceptions/invalid-sets'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import RoutineDescription from '~/routine/domain/models/description'
import RoutineId from '~/routine/domain/models/id'
import RoutineName from '~/routine/domain/models/name'
import Routine from '~/routine/domain/models/routine'
import RoutineWorkout from '~/routine/domain/models/workout'
import Routines from '~/routine/domain/services/routines'
import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'
import NotFoundUser from '~/user/domain/exceptions/not-found'
import UserId from '~/user/domain/models/id'
import Users from '~/user/domain/services/users'

import EditRoutine from '../edit-routine'

@CommandHandler(EditRoutine)
class EditRoutineHandler implements ICommandHandler {
  constructor(
    @Inject(Routines) private readonly routines: Routines,
    @Inject(Exercises) private readonly exercises: Exercises,
    @Inject(Users) private readonly users: Users,
  ) {}

  async execute(
    command: EditRoutine,
  ): Promise<
    Either<
      (
        | InvalidUuid
        | InvalidRoutineDescription
        | InvalidRoutineName
        | InvalidWorkoutReps
        | InvalidWorkoutSets
        | NotFoundExercise
        | NotFoundRoutine
        | NotFoundUser
      )[],
      Routine
    >
  > {
    const id = RoutineId.fromString(command.id)
    const isInvalidId = Either.isLeft(id)

    const description = RoutineDescription.fromString(command.description)
    const isInvalidDescription = Either.isLeft(description)

    const name = RoutineName.fromString(command.name)
    const isInvalidName = Either.isLeft(name)

    const ownerId = UserId.fromString(command.ownerId)
    const isInvalidOwnerId = Either.isLeft(ownerId)
    const ownerNotFound =
      !isInvalidOwnerId &&
      Either.isLeft(await this.users.withId(ownerId.value as UserId))

    const workouts = command.workouts.map((workout) =>
      RoutineWorkout.fromValue(workout),
    )
    const workoutExceptions = workouts.filter((workout) =>
      Either.isLeft(workout),
    )
    const isInvalidWorkouts = workoutExceptions.length > 0

    const exerciseIdExceptions = []
    for (const workout of workouts) {
      if (Either.isLeft(workout)) continue

      const exerciseId = ExerciseId.fromString(workout.value.value.exerciseId)
        .value as ExerciseId

      const exercise = await this.exercises.withId(exerciseId)

      if (Either.isLeft(exercise)) exerciseIdExceptions.push(exercise)
    }
    const isInvalidWorkoutsExercisesId = exerciseIdExceptions.length > 0

    const routine = !isInvalidId && (await this.routines.withId(id.value))
    const notFoundRoutine = Either.isLeft(routine)

    const exceptions = []
    if (isInvalidId) exceptions.push(id.value)
    if (isInvalidDescription) exceptions.push(description.value)
    if (isInvalidName) exceptions.push(name.value)
    if (isInvalidOwnerId) exceptions.push(ownerId.value)
    if (ownerNotFound) exceptions.push(NotFoundUser.withId(ownerId.value.value))
    if (isInvalidWorkouts)
      exceptions.push(
        ...workoutExceptions.map((workout) => workout.value).flat(),
      )
    if (isInvalidWorkoutsExercisesId)
      exceptions.push(...exerciseIdExceptions.map((workout) => workout.value))
    if (notFoundRoutine) exceptions.push(routine.value)

    if (
      isInvalidId ||
      isInvalidDescription ||
      isInvalidName ||
      isInvalidOwnerId ||
      ownerNotFound ||
      isInvalidWorkouts ||
      isInvalidWorkoutsExercisesId ||
      notFoundRoutine
    )
      return Either.left(exceptions)

    routine.value.rename(name.value)
    routine.value.redescribe(description.value)
    routine.value.changeWorkouts(
      workouts.map((workout) => workout.value) as RoutineWorkout[],
    )

    this.routines.save(routine.value)

    return Either.right(routine.value)
  }
}

export default EditRoutineHandler
