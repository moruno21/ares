import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either from '~/shared/either'

import RoutineView, { RoutineWorkoutView } from '../models/view'

type RoutineViews = Readonly<{
  add: (view: RoutineView) => Promise<RoutineView>
  changeWorkouts: (id: string, workouts: RoutineWorkoutView[]) => Promise<void>
  delete: (id: string) => Promise<void>
  getAll: () => Promise<RoutineView[]>
  redescribe: (id: string, description: string) => Promise<void>
  rename: (id: string, name: string) => Promise<void>
  withExercise: (id: string) => Promise<RoutineView[]>
  withId: (id: string) => Promise<Either<NotFoundRoutine, RoutineView>>
  withOwnerId: (id: string) => Promise<RoutineView[]>
}>

const RoutineViews = 'RoutineViews' as const

export default RoutineViews
