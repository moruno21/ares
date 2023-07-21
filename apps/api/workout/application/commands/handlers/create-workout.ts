import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import ExerciseId from '~/exercise/domain/models/id'
import Exercises from '~/exercise/domain/services/exercises'
import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'
import InvalidWorkoutReps from '~/workout/domain/exceptions/invalid-reps'
import InvalidWorkoutSets from '~/workout/domain/exceptions/invalid-sets'
import WorkoutId from '~/workout/domain/models/id'
import WorkoutReps from '~/workout/domain/models/reps'
import WorkoutSets from '~/workout/domain/models/sets'
import Workout from '~/workout/domain/models/workout'
import Workouts from '~/workout/domain/services/workouts'

import CreateWorkout from '../create-workout'

@CommandHandler(CreateWorkout)
class CreateWorkoutHandler implements ICommandHandler {
  constructor(
    @Inject(Exercises) private readonly exercises: Exercises,
    @Inject(Workouts) private readonly workouts: Workouts,
  ) {}

  async execute(
    command: CreateWorkout,
  ): Promise<
    Either<
      (
        | InvalidUuid
        | InvalidWorkoutReps
        | InvalidWorkoutSets
        | NotFoundExercise
      )[],
      Workout
    >
  > {
    const id = WorkoutId.fromString(command.id)
    const exerciseId = ExerciseId.fromString(command.exerciseId)
    const reps = WorkoutReps.fromNumber(command.reps)
    const sets = WorkoutSets.fromNumber(command.sets)

    const isInvalidId = Either.isLeft(id)
    const isInvalidExerciseId = Either.isLeft(exerciseId)
    const isInvalidReps = Either.isLeft(reps)
    const isInvalidSets = Either.isLeft(sets)
    const notFoundExercise =
      !isInvalidExerciseId &&
      Either.isLeft(await this.exercises.findWithId(exerciseId.value))

    const exceptions = []
    if (isInvalidId) exceptions.push(id.value)
    if (isInvalidExerciseId) exceptions.push(exerciseId.value)
    if (isInvalidReps) exceptions.push(reps.value)
    if (isInvalidSets) exceptions.push(sets.value)
    if (notFoundExercise)
      exceptions.push(NotFoundExercise.withId(exerciseId.value.value))

    if (
      isInvalidId ||
      isInvalidExerciseId ||
      isInvalidReps ||
      isInvalidSets ||
      notFoundExercise
    )
      return Either.left(exceptions)

    const workout = Workout.create({
      exerciseId: exerciseId.value,
      id: id.value,
      reps: reps.value,
      sets: sets.value,
    })

    this.workouts.save(workout)

    return Either.right(workout)
  }
}

export default CreateWorkoutHandler
