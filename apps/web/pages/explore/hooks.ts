import { useTranslation } from 'react-i18next'

const useExplore = () => {
  const { t } = useTranslation('explore')

  return { t }
}

export default useExplore
