import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'

import CreateExercise from '~/exercise/application/commands/create-exercise'
import DeleteExercise from '~/exercise/application/commands/delete-exercise'
import CreateExerciseHandler from '~/exercise/application/commands/handlers/create-exercise'
import DeleteExerciseHandler from '~/exercise/application/commands/handlers/delete-exercise'
import GetExercise from '~/exercise/application/queries/get-exercise'
import GetExercises from '~/exercise/application/queries/get-exercises'
import GetExerciseHandler from '~/exercise/application/queries/handlers/get-exercise'
import GetExercisesHandler from '~/exercise/application/queries/handlers/get-exercises'
import Either from '~/shared/either'
import Uuid from '~/shared/uuid'

import { Exercise, ExerciseInput } from '../models/graphql/model'
import ExerciseDto from '../models/http/dto'

@Resolver(() => Exercise)
class ExercisesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [Exercise])
  async exercises(): Promise<ExerciseDto[]> {
    const response: Awaited<ReturnType<GetExercisesHandler['execute']>> =
      await this.queryBus.execute(GetExercises.all())

    return response.map((exerciseView) =>
      ExerciseDto.fromExerciseView(exerciseView),
    )
  }

  @Query(() => Exercise)
  async exercise(@Args('id') id: string): Promise<ExerciseDto | GraphQLError> {
    const response: Awaited<ReturnType<GetExerciseHandler['execute']>> =
      await this.queryBus.execute(GetExercise.with({ id }))

    if (Either.isLeft(response))
      return new GraphQLError(response.value.message, {
        extensions: { code: response.value.code },
      })

    return ExerciseDto.fromExerciseView(response.value)
  }

  @Mutation(() => Exercise)
  async createExercise(
    @Args('exerciseInput') exerciseInput: ExerciseInput,
  ): Promise<ExerciseDto | GraphQLError> {
    const id = Uuid.generate()

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

  @Mutation(() => Exercise)
  async deleteExercise(
    @Args('id') id: string,
  ): Promise<ExerciseDto | GraphQLError> {
    const response: Awaited<ReturnType<DeleteExerciseHandler['execute']>> =
      await this.commandBus.execute(DeleteExercise.with({ id }))

    if (Either.isLeft(response))
      return new GraphQLError(response.value.message, {
        extensions: { code: response.value.code },
      })

    return ExerciseDto.fromExercise(response.value)
  }
}

export default ExercisesResolver
