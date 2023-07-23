import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import CreateRoutine from '~/routine/application/commands/create-routine'
import CreateRoutineHandler from '~/routine/application/commands/handlers/create-routine'
import Either from '~/shared/either'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'

import RoutineDto from '../models/http/dto'
import PostRoutineDto from '../models/http/post-dto'

@ApiTags('Routines')
@Controller('routines')
class RoutinesController {
  constructor(private readonly commandBus: CommandBus) {}

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
          workouts: dto.workouts,
        }),
      )

    if (Either.isLeft(response))
      throw new BadRequestException(HttpError.fromExceptions(response.value))

    return RoutineDto.fromRoutine(response.value)
  }
}

export default RoutinesController
