import NameType from '~/shared/name-type'

const __name__ = 'RoutineView'

export type RoutineWorkoutView = Readonly<{
  exerciseId: string
  exerciseName: string
  reps: number
  sets: number
}>

type RoutineView = NameType<
  Readonly<{
    description: string
    id: string
    name: string
    ownerId: string
    workouts: RoutineWorkoutView[]
  }>,
  typeof __name__
>

const RoutineView = {
  with: (props: Omit<RoutineView, '__name__'>): RoutineView => ({
    ...props,
    __name__,
  }),
} as const

export default RoutineView
