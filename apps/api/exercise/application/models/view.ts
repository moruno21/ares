import NameType from '~/shared/name-type'

type ExerciseView = NameType<
  Readonly<{
    description: string
    id: string
    name: string
  }>,
  'ExerciseView'
>

export default ExerciseView
