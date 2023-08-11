import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import ROUTINE from '~/graphql/queries/routine'
import { RoutineQuery } from '~/graphql/types'

const useRoutine = () => {
  const { id } = useParams()
  const { data } = useQuery<RoutineQuery>(ROUTINE, {
    variables: { routineId: id ?? '' },
  })
  const { t } = useTranslation('routine')

  const routine = useMemo(() => {
    if (!data) return

    return data.routine
  }, [data])

  return { routine, t }
}

export default useRoutine
