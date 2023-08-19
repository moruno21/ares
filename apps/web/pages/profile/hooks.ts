import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import useMe from '~/hooks/useMe'

const useLayout = () => {
  const { t } = useTranslation('profile')
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false)
  const { me } = useMe()
  const userEmail = me?.email
  const userName = me?.name

  const handleCloseLogOutModal = useCallback(() => {
    setIsLogOutModalOpen(false)
  }, [])

  const handleOpenLogOutModal = useCallback(() => {
    setIsLogOutModalOpen(true)
  }, [])

  return {
    handleCloseLogOutModal,
    handleOpenLogOutModal,
    isLogOutModalOpen,
    t,
    userEmail,
    userName,
  }
}

export default useLayout
