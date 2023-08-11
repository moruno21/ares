import { useTranslation } from 'react-i18next'

const useWorkout = () => {
  const { t } = useTranslation('routine')

  return { t }
}

export default useWorkout
