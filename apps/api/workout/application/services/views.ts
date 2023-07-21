import WorkoutView from '../models/view'

type WorkoutViews = Readonly<{
  add: (view: WorkoutView) => Promise<WorkoutView>
}>

const WorkoutViews = 'WorkoutViews' as const

export default WorkoutViews
