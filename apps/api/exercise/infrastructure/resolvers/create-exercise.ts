import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { v4 as uuid } from 'uuid'

import CreateExercise from '~/exercise/application/commands/create-exercise'
import CreateExerciseHandler from '~/exercise/application/commands/handlers/create-exercise'
import Either from '~/shared/either'

import { Exercise, ExerciseInput } from '../models/graphql/model'
import ExerciseDto from '../models/http/dto'

@Resolver(() => Exercise)
class CreateExerciseResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => Exercise, { name: 'exercise' })
  async createExercise(
    @Args('exerciseInput') exerciseInput: ExerciseInput,
  ): Promise<ExerciseDto | GraphQLError> {
    const id = uuid()

    const response: Awaited<ReturnType<CreateExerciseHandler['execute']>> =
      await this.commandBus.execute(
        CreateExercise.with({
          description: exerciseInput.description,
          id,
          name: exerciseInput.name,
        }),
      )

    if (Either.isLeft(response))
      return new GraphQLError(response.value[0].message, {
        extensions: { code: response.value[0].code },
      })

    return ExerciseDto.fromExercise(response.value)
  }
}

export default CreateExerciseResolver
