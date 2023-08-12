import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import useRoutine from '~/hooks/useRoutine'

const useLayout = () => {
  const { id } = useParams()
  const { routine } = useRoutine({ id })
  const { t } = useTranslation('routine')

  return { routine, t }
}

export default useLayout
