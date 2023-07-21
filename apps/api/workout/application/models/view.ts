import NameType from '~/shared/name-type'

const __name__ = 'WorkoutView'

type WorkoutView = NameType<
  Readonly<{
    exerciseId: string
    id: string
    reps: number
    sets: number
  }>,
  typeof __name__
>

const WorkoutView = {
  with: (props: Omit<WorkoutView, '__name__'>): WorkoutView => ({
    ...props,
    __name__,
  }),
} as const

export default WorkoutView
