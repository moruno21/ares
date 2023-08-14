import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import useRoutine from '~/hooks/useRoutine'

import { initialValues as emptyInitialValues } from './constants'
import { Values } from './types'

const useLayout = () => {
  const { id } = useParams()
  const { edit: editRoutine, routine } = useRoutine({ id })
  const { t } = useTranslation('routine')

  const initialValues = useMemo(() => routine ?? emptyInitialValues, [routine])

  const handleSubmit = useCallback(
    async (values: Values) => {
      const result = await editRoutine(id ?? '', values)
      if (!result) return
    },
    [editRoutine, id],
  )

  return {
    handleSubmit,
    initialValues,
    routine,
    t,
  }
}

export default useLayout
