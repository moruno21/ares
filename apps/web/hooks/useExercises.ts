import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

import EXERCISES from '~/graphql/queries/exercises'
import { ExercisesQuery, ExercisesQueryVariables } from '~/graphql/types'

const useExercises = () => {
  const { data, loading } = useQuery<ExercisesQuery, ExercisesQueryVariables>(
    EXERCISES,
  )

  const exercises = useMemo(() => {
    if (!data) return []

    return data.exercises
  }, [data])

  return { exercises, loading }
}

export default useExercises
