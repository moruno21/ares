import NamedType from '~/shared/named-type'

type ExerciseView = NamedType<
  Readonly<{
    description: string
    id: string
    name: string
  }>,
  'ExerciseView'
>

export default ExerciseView
