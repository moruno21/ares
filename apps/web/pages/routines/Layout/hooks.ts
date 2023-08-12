import { useTranslation } from 'react-i18next'

import useRoutines from '~/hooks/useRoutines'

const useLayout = () => {
  const { routines } = useRoutines()
  const { t } = useTranslation('routines')

  return { routines, t }
}

export default useLayout
