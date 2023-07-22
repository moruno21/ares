import RoutineView from '../models/view'

type RoutineViews = Readonly<{
  add: (view: RoutineView) => Promise<RoutineView>
}>

const RoutineViews = 'RoutineViews' as const

export default RoutineViews
