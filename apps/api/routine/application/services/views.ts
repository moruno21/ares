import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either from '~/shared/either'

import RoutineView from '../models/view'

type RoutineViews = Readonly<{
  add: (view: RoutineView) => Promise<RoutineView>
  changeWorkouts: (
    id: string,
    workouts: { exerciseId: string; reps: number; sets: number }[],
  ) => Promise<void>
  delete: (id: string) => Promise<void>
  getAll: () => Promise<RoutineView[]>
  redescribe: (id: string, description: string) => Promise<void>
  rename: (id: string, name: string) => Promise<void>
  withId: (id: string) => Promise<Either<NotFoundRoutine, RoutineView>>
}>

const RoutineViews = 'RoutineViews' as const

export default RoutineViews
