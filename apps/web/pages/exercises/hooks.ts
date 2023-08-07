import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const useExercises = () => {
  const { t } = useTranslation('exercises')

  const exercises = useMemo(
    () => [
      {
        description: 'Mock Exercise description 1',
        id: 'exercise1',
        name: 'Mock Exercise 1',
      },
      {
        description: 'Mock Exercise description 2',
        id: 'exercise2',
        name: 'Mock Exercise 2',
      },
      {
        description: 'Mock Exercise description 3',
        id: 'exercise3',
        name: 'Mock Exercise 3',
      },
    ],
    [],
  )

  return { exercises, t }
}

export default useExercises
