import { DataTable, When } from '@cucumber/cucumber'
import { BadRequestException } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { Test } from '@nestjs/testing'

import CreateExerciseHandler from '~/exercise/application/commands/handlers/create-exercise'
import ExerciseCreatedHandler from '~/exercise/application/event-handlers/exercise-created'
import ExerciseViews from '~/exercise/application/services/views'
import Exercises from '~/exercise/domain/services/exercises'
import ExerciseController from '~/exercise/infrastructure/controllers/exercises'
import HttpError from '~/shared/http/error'

import { Context } from './common'

When(
  /^I create the following exercise?:$/,
  async function (this: Context, dataTable: DataTable) {
    const module = await Test.createTestingModule({
      controllers: [ExerciseController],
      imports: [CqrsModule],
      providers: [
        CreateExerciseHandler,
        ExerciseCreatedHandler,
        {
          provide: Exercises,
          useValue: this.exercises,
        },
        {
          provide: ExerciseViews,
          useValue: this.views,
        },
      ],
    }).compile()
    const exerciseController = module.get(ExerciseController)

    await module.createNestApplication().init()

    for (const { description, name } of dataTable.hashes()) {
      try {
        await exerciseController.createExercise({ description, name })
      } catch (exception) {
        if (!(exception instanceof BadRequestException)) throw exception

        const response = exception.getResponse() as HttpError

        this.errors.push(
          ...response.errors.map((value) => ({
            code: value.code,
            name: value.name,
          })),
        )
      }
    }
  },
)
