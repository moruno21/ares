import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import Either from '~/shared/either'

import ExerciseView from '../models/view'

type ExerciseViews = Readonly<{
  add: (view: ExerciseView) => Promise<ExerciseView>
  delete: (id: string) => Promise<void>
  getAll: () => Promise<ExerciseView[]>
  withId: (id: string) => Promise<Either<NotFoundExercise, ExerciseView>>
  withName: (name: string) => Promise<Either<NotFoundExercise, ExerciseView>>
}>

const ExerciseViews = 'ExerciseViews' as const

export default ExerciseViews
