import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import CreateExercise from '~/exercise/application/commands/create-exercise'
import DeleteExercise from '~/exercise/application/commands/delete-exercise'
import CreateExerciseHandler from '~/exercise/application/commands/handlers/create-exercise'
import DeleteExerciseHandler from '~/exercise/application/commands/handlers/delete-exercise'
import GetExercise from '~/exercise/application/queries/get-exercise'
import GetExercises from '~/exercise/application/queries/get-exercises'
import GetExerciseHandler from '~/exercise/application/queries/handlers/get-exercise'
import GetExercisesHandler from '~/exercise/application/queries/handlers/get-exercises'
import Either from '~/shared/either'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'

import ExerciseDto from '../models/http/dto'
import PostExerciseDto from '../models/http/post-dto'

@ApiTags('Exercises')
@Controller('exercises')
class ExercisesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Gets all Exercises' })
  @ApiOkResponse({
    description: 'Exercises',
    type: [ExerciseDto],
  })
  @Get()
  async getExercises(): Promise<ExerciseDto[]> {
    const response: Awaited<ReturnType<GetExercisesHandler['execute']>> =
      await this.queryBus.execute(GetExercises.all())

    return response.map((exerciseView) =>
      ExerciseDto.fromExerciseView(exerciseView),
    )
  }

  @ApiOperation({ summary: 'Gets an Exercise' })
  @ApiOkResponse({
    description: 'Exercise',
    type: ExerciseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  @Get(':id')
  async getExercise(
    @Param('id') id: string,
  ): Promise<ExerciseDto | BadRequestException> {
    const response: Awaited<ReturnType<GetExerciseHandler['execute']>> =
      await this.queryBus.execute(GetExercise.with({ id }))

    if (Either.isLeft(response))
      throw new BadRequestException(HttpError.fromExceptions([response.value]))

    return ExerciseDto.fromExerciseView(response.value)
  }

  @ApiOperation({ summary: 'Creates an Exercise' })
  @ApiCreatedResponse({
    description: 'Exercise created',
    type: ExerciseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Post()
  async createExercise(
    @Body() dto: PostExerciseDto,
  ): Promise<ExerciseDto | BadRequestException> {
    const id = Uuid.generate()

    const response: Awaited<ReturnType<CreateExerciseHandler['execute']>> =
      await this.commandBus.execute(
        CreateExercise.with({
          description: dto.description,
          id,
          name: dto.name,
        }),
      )

    if (Either.isLeft(response))
      throw new BadRequestException(HttpError.fromExceptions(response.value))

    return ExerciseDto.fromExercise(response.value)
  }

  @ApiOperation({ summary: 'Deletes an Exercise' })
  @ApiOkResponse({
    description: 'Exercise deleted',
    type: ExerciseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Delete(':id')
  async deleteExercise(
    @Param('id') id: string,
  ): Promise<ExerciseDto | BadRequestException> {
    const response: Awaited<ReturnType<DeleteExerciseHandler['execute']>> =
      await this.commandBus.execute(DeleteExercise.with({ id }))

    if (Either.isLeft(response))
      throw new BadRequestException(HttpError.fromExceptions([response.value]))

    return ExerciseDto.fromExercise(response.value)
  }
}

export default ExercisesController
