import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import Either from '~/shared/either'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'
import CreateWorkout from '~/workout/application/commands/create-workout'
import CreateWorkoutHandler from '~/workout/application/commands/handlers/create-workout'

import WorkoutDto from '../models/http/dto'
import PostWorkoutDto from '../models/http/post-dto'

@ApiTags('Workouts')
@Controller('workouts')
class WorkoutsController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Creates a Workout' })
  @ApiCreatedResponse({
    description: 'Workout created',
    type: WorkoutDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Post()
  async createWorkout(
    @Body() dto: PostWorkoutDto,
  ): Promise<WorkoutDto | BadRequestException> {
    const response: Awaited<ReturnType<CreateWorkoutHandler['execute']>> =
      await this.commandBus.execute(
        CreateWorkout.with({
          exerciseId: dto.exerciseId,
          id: Uuid.generate(),
          reps: dto.reps,
          sets: dto.sets,
        }),
      )

    if (Either.isLeft(response))
      throw new BadRequestException(HttpError.fromExceptions(response.value))

    return WorkoutDto.fromWorkout(response.value)
  }
}

export default WorkoutsController
