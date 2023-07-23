import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import Either from '~/shared/either'

import RoutineView from '../models/view'

type RoutineViews = Readonly<{
  add: (view: RoutineView) => Promise<RoutineView>
  delete: (id: string) => Promise<void>
  getAll: () => Promise<RoutineView[]>
  withId: (id: string) => Promise<Either<NotFoundRoutine, RoutineView>>
}>

const RoutineViews = 'RoutineViews' as const

export default RoutineViews
