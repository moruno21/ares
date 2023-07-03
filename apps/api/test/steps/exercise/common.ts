import { Before, DataTable, Given, Then } from '@cucumber/cucumber'
import expect from 'expect'

import ExerciseView from '~/exercise/application/models/view'
import ExerciseDescription from '~/exercise/domain/models/description'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import ExerciseName from '~/exercise/domain/models/name'
import InMemoryExercises from '~/exercise/infrastructure/services/in-memory-exercises'
import InMemoryExerciseViews from '~/exercise/infrastructure/services/in-memory-views'
import Uuid from '~/shared/uuid'
import { Context as DefaultContext } from '~/test/steps/common'

import ExerciseTable from '../../tables/exercise'

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
