import NamedType from '~/shared/named-type'

type ExerciseView = NamedType<
  Readonly<{
    id: string
    name: string
  }>,
  'ExerciseView'
>

export default ExerciseView
