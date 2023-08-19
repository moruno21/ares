import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'

import CreateRoutine from '~/routine/application/commands/create-routine'
import DeleteRoutine from '~/routine/application/commands/delete-routine'
import EditRoutine from '~/routine/application/commands/edit-routine'
import CreateRoutineHandler from '~/routine/application/commands/handlers/create-routine'
import DeleteRoutineHandler from '~/routine/application/commands/handlers/delete-routine'
import EditRoutineHandler from '~/routine/application/commands/handlers/edit-routine'
import GetRoutine from '~/routine/application/queries/get-routine'
import GetRoutines from '~/routine/application/queries/get-routines'
import GetRoutinesByOwnerId from '~/routine/application/queries/get-routines-by-owner-id'
import GetRoutineHandler from '~/routine/application/queries/handlers/get-routine'
import GetRoutinesHandler from '~/routine/application/queries/handlers/get-routines'
import GetRoutinesByOwnerIdHandler from '~/routine/application/queries/handlers/get-routines-by-owner-id'
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

  @Query(() => [Routine])
  async routinesByOwnerId(
    @Args('ownerId') ownerId: string,
  ): Promise<RoutineDto[] | GraphQLError> {
    const response: Awaited<
      ReturnType<GetRoutinesByOwnerIdHandler['execute']>
    > = await this.queryBus.execute(GetRoutinesByOwnerId.with({ ownerId }))

    if (Either.isLeft(response))
      return new GraphQLError(response.value[0].message, {
        extensions: { code: response.value[0].code },
      })

    return response.value.map((routineView) =>
      RoutineDto.fromRoutineView(routineView),
    )
  }

  @Query(() => Routine)
  async routine(@Args('id') id: string): Promise<RoutineDto | GraphQLError> {
    const response: Awaited<ReturnType<GetRoutineHandler['execute']>> =
      await this.queryBus.execute(GetRoutine.with({ id }))

    if (Either.isLeft(response))
      return new GraphQLError(response.value[0].message, {
        extensions: { code: response.value[0].code },
      })

    return RoutineDto.fromRoutineView(response.value)
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
          ownerId: routineInput.ownerId,
          workouts: routineInput.workouts,
        }),
      )

    if (Either.isLeft(response))
      return new GraphQLError(response.value[0].message, {
        extensions: { code: response.value[0].code },
      })

    return RoutineDto.fromRoutine(response.value)
  }

  @Mutation(() => Routine)
  async editRoutine(
    @Args('id') id: string,
    @Args('routineInput') routineInput: RoutineInput,
  ): Promise<RoutineDto | GraphQLError> {
    const response: Awaited<ReturnType<EditRoutineHandler['execute']>> =
      await this.commandBus.execute(
        EditRoutine.with({
          description: routineInput.description,
          id,
          name: routineInput.name,
          ownerId: routineInput.ownerId,
          workouts: routineInput.workouts,
        }),
      )

    if (Either.isLeft(response))
      return new GraphQLError(response.value[0].message, {
        extensions: { code: response.value[0].code },
      })

    return RoutineDto.fromRoutine(response.value)
  }

  @Mutation(() => Routine)
  async deleteRoutine(
    @Args('id') id: string,
  ): Promise<RoutineDto | GraphQLError> {
    const response: Awaited<ReturnType<DeleteRoutineHandler['execute']>> =
      await this.commandBus.execute(DeleteRoutine.with({ id }))

    if (Either.isLeft(response))
      return new GraphQLError(response.value[0].message, {
        extensions: { code: response.value[0].code },
      })

    return RoutineDto.fromRoutine(response.value)
  }
}

export default RoutinesResolver
