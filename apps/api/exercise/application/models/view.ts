import NameType from '~/shared/name-type'

const __name__ = 'ExerciseView'

type ExerciseView = NameType<
  Readonly<{
    description: string
    id: string
    name: string
  }>,
  typeof __name__
>

const ExerciseView = {
  with: (props: Omit<ExerciseView, '__name__'>): ExerciseView => ({
    ...props,
    __name__,
  }),
} as const

export default ExerciseView
