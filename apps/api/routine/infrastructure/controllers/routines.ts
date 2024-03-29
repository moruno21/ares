import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import CreateRoutine from '~/routine/application/commands/create-routine'
import DeleteRoutine from '~/routine/application/commands/delete-routine'
import EditRoutine from '~/routine/application/commands/edit-routine'
import CreateRoutineHandler from '~/routine/application/commands/handlers/create-routine'
import DeleteRoutineHandler from '~/routine/application/commands/handlers/delete-routine'
import EditRoutineHandler from '~/routine/application/commands/handlers/edit-routine'
import GetRoutine from '~/routine/application/queries/get-routine'
import GetRoutines from '~/routine/application/queries/get-routines'
import GetRoutineHandler from '~/routine/application/queries/handlers/get-routine'
import GetRoutinesHandler from '~/routine/application/queries/handlers/get-routines'
import Either from '~/shared/either'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'

import RoutineDto from '../models/http/dto'
import PostRoutineDto from '../models/http/post-dto'
import PutRoutineDto from '../models/http/put-dto'

@ApiTags('Routines')
@Controller('routines')
class RoutinesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Gets all Routines' })
  @ApiOkResponse({
    description: 'Routines',
    type: [RoutineDto],
  })
  @Get()
  async getRoutines(): Promise<RoutineDto[]> {
    const response: Awaited<ReturnType<GetRoutinesHandler['execute']>> =
      await this.queryBus.execute(GetRoutines.all())

    return response.map((routineView) =>
      RoutineDto.fromRoutineView(routineView),
    )
  }
  @ApiOperation({ summary: 'Gets a Routine' })
  @ApiOkResponse({
    description: 'Routine',
    type: RoutineDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  @Get(':id')
  async getRoutine(
    @Param('id') id: string,
  ): Promise<RoutineDto | BadRequestException> {
    const response: Awaited<ReturnType<GetRoutineHandler['execute']>> =
      await this.queryBus.execute(GetRoutine.with({ id }))

    if (Either.isLeft(response))
      throw new BadRequestException(HttpError.fromExceptions(response.value))

    return RoutineDto.fromRoutineView(response.value)
  }

  @ApiOperation({ summary: 'Creates a Routine' })
  @ApiCreatedResponse({
    description: 'Routine created',
    type: RoutineDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Post()
  async createRoutine(
    @Body() dto: PostRoutineDto,
  ): Promise<RoutineDto | BadRequestException> {
    const response: Awaited<ReturnType<CreateRoutineHandler['execute']>> =
      await this.commandBus.execute(
        CreateRoutine.with({
          description: dto.description,
          id: Uuid.generate(),
          name: dto.name,
          ownerId: dto.ownerId,
          workouts: dto.workouts,
        }),
      )

    if (Either.isLeft(response))
      throw new BadRequestException(HttpError.fromExceptions(response.value))

    return RoutineDto.fromRoutine(response.value)
  }

  @ApiOperation({ summary: 'Edits a Routine' })
  @ApiCreatedResponse({
    description: 'Routine edited',
    type: RoutineDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Put(':id')
  async editRoutine(
    @Param('id') id: string,
    @Body() dto: PutRoutineDto,
  ): Promise<RoutineDto | BadRequestException> {
    const response: Awaited<ReturnType<EditRoutineHandler['execute']>> =
      await this.commandBus.execute(
        EditRoutine.with({
          description: dto.description,
          id,
          name: dto.name,
          ownerId: dto.ownerId,
          workouts: dto.workouts,
        }),
      )

    if (Either.isLeft(response))
      throw new BadRequestException(HttpError.fromExceptions(response.value))

    return RoutineDto.fromRoutine(response.value)
  }

  @ApiOperation({ summary: 'Deletes a Routine' })
  @ApiOkResponse({
    description: 'Routine deleted',
    type: RoutineDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Delete(':id')
  async deleteRoutine(
    @Param('id') id: string,
  ): Promise<RoutineDto | BadRequestException> {
    const response: Awaited<ReturnType<DeleteRoutineHandler['execute']>> =
      await this.commandBus.execute(DeleteRoutine.with({ id }))

    if (Either.isLeft(response))
      throw new BadRequestException(HttpError.fromExceptions(response.value))

    return RoutineDto.fromRoutine(response.value)
  }
}

export default RoutinesController
