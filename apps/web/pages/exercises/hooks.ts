import { ApolloError, useApolloClient, useQuery } from '@apollo/client'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import CREATE_EXERCISE from '~/graphql/mutations/createExercise'
import EXERCISES from '~/graphql/queries/exercises'
import {
  CreateExerciseMutation,
  CreateExerciseMutationVariables,
  ExercisesQuery,
} from '~/graphql/types'

import { Values } from './types'

const useExercises = () => {
  const { cache, mutate } = useApolloClient()
  const [createError, setCreateError] = useState<string>()
  const { data } = useQuery<ExercisesQuery>(EXERCISES)
  const [isCreateError, setIsCreateError] = useState(false)
  const [isCreateExerciseOpen, setIsCreateExerciseOpen] = useState(false)
  const { t } = useTranslation('exercises')

  const exercises = useMemo(() => {
    if (!data) return []

    return data.exercises
  }, [data])

  const handleCloseCreateExercise = useCallback(() => {
    setIsCreateExerciseOpen(false)
  }, [])

  const handleOpenCreateExercise = useCallback(() => {
    setIsCreateExerciseOpen(true)
  }, [])

  const handleSubmit = useCallback(
    async (values: Values) => {
      try {
        const response = await mutate<
          CreateExerciseMutation,
          CreateExerciseMutationVariables
        >({
          mutation: CREATE_EXERCISE,
          variables: {
            exerciseInput: {
              description: values.description,
              name: values.name,
            },
          },
        })

        cache.writeQuery({
          data: {
            exercises: [...exercises, response.data?.createExercise],
          },
          query: EXERCISES,
        })

        setIsCreateError(false)
        handleCloseCreateExercise()
      } catch (err) {
        if (err instanceof ApolloError) {
          setCreateError(err.message)
          setIsCreateError(true)
        }
      }
    },
    [cache, exercises, handleCloseCreateExercise, mutate],
  )

  return {
    createError,
    exercises,
    handleCloseCreateExercise,
    handleOpenCreateExercise,
    handleSubmit,
    isCreateError,
    isCreateExerciseOpen,
    t,
  }
}

export default useExercises
