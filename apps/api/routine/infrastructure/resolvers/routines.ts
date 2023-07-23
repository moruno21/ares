import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'

import CreateRoutine from '~/routine/application/commands/create-routine'
import CreateRoutineHandler from '~/routine/application/commands/handlers/create-routine'
import GetRoutines from '~/routine/application/queries/get-routines'
import GetRoutinesHandler from '~/routine/application/queries/handlers/get-routines'
import Either from '~/shared/either'
import Uuid from '~/shared/uuid'

import { Routine, RoutineInput } from '../models/graphql/model'
import RoutineDto from '../models/http/dto'

@Resolver(() => Routine)
class RoutinesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [Routine])
  async routines(): Promise<RoutineDto[]> {
    const response: Awaited<ReturnType<GetRoutinesHandler['execute']>> =
      await this.queryBus.execute(GetRoutines.all())

    return response.map((routineView) =>
      RoutineDto.fromRoutineView(routineView),
    )
  }

  @Mutation(() => Routine)
  async createRoutine(
    @Args('routineInput') routineInput: RoutineInput,
  ): Promise<RoutineDto | GraphQLError> {
    const id = Uuid.generate()

    const response: Awaited<ReturnType<CreateRoutineHandler['execute']>> =
      await this.commandBus.execute(
        CreateRoutine.with({
          description: routineInput.description,
          id,
          name: routineInput.name,
          workouts: routineInput.workouts,
        }),
      )

    if (Either.isLeft(response))
      return new GraphQLError(response.value[0].message, {
        extensions: { code: response.value[0].code },
      })

    return RoutineDto.fromRoutine(response.value)
  }
}

export default RoutinesResolver
