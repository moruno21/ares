import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'

import Either from '~/shared/either'
import Uuid from '~/shared/uuid'
import CreateWorkout from '~/workout/application/commands/create-workout'
import CreateWorkoutHandler from '~/workout/application/commands/handlers/create-workout'

import { Workout, WorkoutInput } from '../models/graphql/model'
import WorkoutDto from '../models/http/dto'

@Resolver(() => Workout)
class WorkoutsResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => Workout)
  async createWorkout(
    @Args('workoutInput') workoutInput: WorkoutInput,
  ): Promise<WorkoutDto | GraphQLError> {
    const id = Uuid.generate()

    const response: Awaited<ReturnType<CreateWorkoutHandler['execute']>> =
      await this.commandBus.execute(
        CreateWorkout.with({
          exerciseId: workoutInput.exerciseId,
          id,
          reps: workoutInput.reps,
          sets: workoutInput.sets,
        }),
      )

    if (Either.isLeft(response))
      return new GraphQLError(response.value[0].message, {
        extensions: { code: response.value[0].code },
      })

    return WorkoutDto.fromWorkout(response.value)
  }
}

export default WorkoutsResolver
