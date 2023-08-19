import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

const useLayout = () => {
  const { t } = useTranslation('profile')
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false)

  const handleCloseLogOutModal = useCallback(() => {
    setIsLogOutModalOpen(false)
  }, [])

  const handleOpenLogOutModal = useCallback(() => {
    setIsLogOutModalOpen(true)
  }, [])

  return { handleCloseLogOutModal, handleOpenLogOutModal, isLogOutModalOpen, t }
}

export default useLayout
