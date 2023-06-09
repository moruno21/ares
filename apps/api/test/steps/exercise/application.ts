import { DataTable, When } from '@cucumber/cucumber'
import { CommandBus, CqrsModule } from '@nestjs/cqrs'
import { Test } from '@nestjs/testing'

import CreateExercise from '~/exercise/application/commands/create-exercise'
import CreateExerciseHandler from '~/exercise/application/commands/handlers/create-exercise'
import CreatedExerciseHandler from '~/exercise/application/event-handlers/exercise-created'
import ExerciseViews from '~/exercise/application/services/views'
import InvalidExerciseName from '~/exercise/domain/exceptions/invalid-name'
import NotCreatedExercise from '~/exercise/domain/exceptions/not-created'
import Exercise from '~/exercise/domain/models/exercise'
import Exercises from '~/exercise/domain/services/exercises'
import Either from '~/shared/either'
import Uuid from '~/shared/uuid'

import { Context } from './common'

When(
  /^I create the following exercise?:$/,
  async function (this: Context, dataTable: DataTable) {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        CreateExerciseHandler,
        CreatedExerciseHandler,
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
    const commandBus = module.get(CommandBus)

    await module.createNestApplication().init()

    for (const { description, name } of dataTable.hashes()) {
      const response = await commandBus.execute<
        CreateExercise,
        Either<(InvalidExerciseName | NotCreatedExercise)[], Exercise>
      >(CreateExercise.with({ description, id: Uuid.generate(), name }))

      if (Either.isRight(response)) return

      this.errors.push(
        ...response.value.map((value) => ({
          code: value.code,
          name: value.__name__,
        })),
      )
    }
  },
)
