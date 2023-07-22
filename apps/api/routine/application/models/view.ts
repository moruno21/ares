import NameType from '~/shared/name-type'

const __name__ = 'RoutineView'

type RoutineView = NameType<
  Readonly<{
    description: string
    id: string
    name: string
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
