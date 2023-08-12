import { ApolloError, useApolloClient } from '@apollo/client'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import CREATE_EXERCISE from '~/graphql/mutations/createExercise'
import EXERCISES from '~/graphql/queries/exercises'
import {
  CreateExerciseMutation,
  CreateExerciseMutationVariables,
} from '~/graphql/types'
import useExercises from '~/hooks/useExercises'

import { Values } from './types'

const useLayout = () => {
  const { cache, mutate } = useApolloClient()
  const [createError, setCreateError] = useState<string>()
  const { exercises } = useExercises()
  const [isCreateError, setIsCreateError] = useState(false)
  const [isCreateExerciseOpen, setIsCreateExerciseOpen] = useState(false)
  const { t } = useTranslation('exercises')

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

export default useLayout
