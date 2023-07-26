import { Before, DataTable, Given, Then, When } from '@cucumber/cucumber'
import { CommandBus, CqrsModule, EventPublisher } from '@nestjs/cqrs'
import { Test } from '@nestjs/testing'
import expect from 'expect'

import CreateExercise from '~/exercise/application/commands/create-exercise'
import CreateExerciseHandler from '~/exercise/application/commands/handlers/create-exercise'
import ExerciseCreatedHandler from '~/exercise/application/event-handlers/exercise-created'
import ExerciseView from '~/exercise/application/models/view'
import ExerciseViews from '~/exercise/application/services/views'
import InvalidExerciseName from '~/exercise/domain/exceptions/invalid-name'
import NotCreatedExercise from '~/exercise/domain/exceptions/not-created'
import ExerciseDescription from '~/exercise/domain/models/description'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import ExerciseName from '~/exercise/domain/models/name'
import Exercises from '~/exercise/domain/services/exercises'
import InMemoryExercises from '~/exercise/infrastructure/services/in-memory-exercises'
import InMemoryExerciseViews from '~/exercise/infrastructure/services/in-memory-views'
import { Event } from '~/shared/domain'
import Either from '~/shared/either'
import Uuid from '~/shared/uuid'
import { Context as DefaultContext } from '~/test/steps/common'
import ExerciseTable from '~/test/tables/exercise'

export type Context = DefaultContext & {
  exercises: InMemoryExercises
  views: InMemoryExerciseViews
}

Before(function (this: Context) {
  this.exercises = InMemoryExercises.withExercises([])
  this.views = InMemoryExerciseViews.withViews([])
})

Given(
  'the exercise list currently looks as follows:',
  function (this: Context, dataTable: DataTable) {
    const list = dataTable.hashes().reduce(
      (previousValue, { description, name }) => {
        const id = Uuid.generate()

        return {
          exercises: [
            ...previousValue.exercises,
            Exercise.create({
              description: ExerciseDescription.fromString(description)
                .value as ExerciseDescription,
              id: ExerciseId.fromString(id).value as ExerciseId,
              name: ExerciseName.fromString(name).value as ExerciseName,
            }),
          ],
          views: [
            ...previousValue.views,
            ExerciseView.with({ description, id, name }),
          ],
        }
      },
      { exercises: [], views: [] },
    )

    this.exercises = InMemoryExercises.withExercises(list.exercises)
    this.views = InMemoryExerciseViews.withViews(list.views)
  },
)

When(
  /^I create the following exercise?:$/,
  async function (this: Context, dataTable: DataTable) {
    const module = await Test.createTestingModule({
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

    const commandBus = module.get(CommandBus)

    const eventPublisher = module.get(EventPublisher) as EventPublisher<Event>

    await module.createNestApplication().init()

    for (const { description, name } of dataTable.hashes()) {
      const id = Uuid.generate()
      const response = await commandBus.execute<
        CreateExercise,
        Either<(InvalidExerciseName | NotCreatedExercise)[], Exercise>
      >(CreateExercise.with({ description, id, name }))

      if (Either.isRight(response)) {
        eventPublisher.mergeObjectContext(response.value).commit()
        return
      }

      this.errors.push(
        ...response.value.map((value) => ({
          code: value.code,
          name: value.__name__,
        })),
      )
    }
  },
)

Then(
  'I should see the following exercise list:',
  function (this: Context, dataTable: DataTable) {
    const table = dataTable.hashes()

    expect(ExerciseTable.fromExercises(this.exercises.exercises)).toStrictEqual(
      table,
    )
    expect(ExerciseTable.fromViews(this.views.views)).toStrictEqual(table)
  },
)
