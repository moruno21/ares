import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { v4 as uuid } from 'uuid'

import CreateExercise from '~/exercise/application/commands/create-exercise'
import CreateExerciseHandler from '~/exercise/application/commands/handlers/create-exercise'
import Either from '~/shared/either'
import HttpError from '~/shared/http/error'

import ExerciseDto from '../../models/http/dto'
import PostExerciseDto from '../../models/http/post-dto'

@ApiTags('Exercises')
@Controller('exercises')
class PostExercise {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Creates an Exercise' })
  @ApiCreatedResponse({
    description: 'Exercise created',
    type: ExerciseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Post()
  async with(
    @Body() dto: PostExerciseDto,
  ): Promise<ExerciseDto | BadRequestException> {
    const id = uuid()

    const response: Awaited<ReturnType<CreateExerciseHandler['execute']>> =
      await this.commandBus.execute(
        CreateExercise.with({
          description: dto.description,
          id,
          name: dto.name,
        }),
      )

    if (Either.isLeft(response))
      return new BadRequestException(HttpError.fromExceptions(response.value))

    return ExerciseDto.fromExercise(response.value)
  }
}

export default PostExercise
