import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import useRoutine from '~/hooks/useRoutine'
import { decrypt } from '~/lib/encryption'

const useLayout = () => {
  const { idHash } = useParams()
  const id = decodeURIComponent(decrypt(idHash ?? ''))
  const { routine } = useRoutine({ id })
  const { t } = useTranslation('landing')

  return { routine, t }
}

export default useLayout
