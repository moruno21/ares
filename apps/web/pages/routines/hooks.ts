import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import ROUTINES from '~/graphql/queries/routines'
import { RoutinesQuery } from '~/graphql/types'

const useRoutines = () => {
  const { data } = useQuery<RoutinesQuery>(ROUTINES)
  const { t } = useTranslation('routines')

  const routines = useMemo(() => {
    if (!data) return []

    return data.routines
  }, [data])

  return { routines, t }
}

export default useRoutines
