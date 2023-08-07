import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const useExplore = () => {
  const { t } = useTranslation('explore')

  const users = useMemo(
    () => [
      {
        id: 'user1',
        name: 'Mock User 1',
      },
      {
        id: 'user2',
        name: 'Mock User 2',
      },
    ],
    [],
  )

  return { t, users }
}

export default useExplore
