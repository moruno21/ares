import ExerciseView from '~/exercise/application/models/view'
import Exercise from '~/exercise/domain/models/exercise'

type ExerciseTable = Readonly<
  {
    description: string
    name: string
  }[]
>

const ExerciseTable = {
  fromExercises: (exercises: Exercise[]) =>
    exercises.map((exercise) => ({
      description: exercise.description.value,
      name: exercise.name.value,
    })),
  fromViews: (views: ExerciseView[]) =>
    views.map((view) => ({ description: view.description, name: view.name })),
} as const

export default ExerciseTable
