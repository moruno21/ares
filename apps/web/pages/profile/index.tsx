import Button from '@ares/ui/components/Button'
import Modal from '@ares/ui/components/Modal'
import { H4 } from '@ares/ui/components/Text'
import { Suspense } from 'react'

import { useAuth } from '~/hooks/useAuth'

import useLayout from './hooks'
import { Card, Container, Field, Footer, Title } from './styles'

const Layout = () => {
  const {
    handleCloseLogOutModal,
    handleOpenLogOutModal,
    isLogOutModalOpen,
    t,
  } = useLayout()

  const { logout } = useAuth()

  return (
    <Container>
      <Title>{t('title')}</Title>
      <Card>
        <Field>
          <H4>{t('username')}</H4>
          Mock username
        </Field>
        <Field>
          <H4>{t('email')}</H4>
          Mock email
        </Field>
        <Button onClick={handleOpenLogOutModal}>
          {t('log_out.button.label')}
        </Button>
      </Card>
      <Suspense>
        {isLogOutModalOpen ? (
          <Modal
            close-aria-label={t('log_out.modal.close')}
            footer={
              <Footer>
                <Button variant="secondary" onClick={handleCloseLogOutModal}>
                  {t('log_out.modal.buttons.cancel.label')}
                </Button>
                <Button onClick={logout}>
                  {t('log_out.modal.buttons.confirm.label')}
                </Button>
              </Footer>
            }
            id="log_out_modal"
            onClose={handleCloseLogOutModal}
            title={t('log_out.modal.title')}
          >
            {t('log_out.modal.description')}
          </Modal>
        ) : null}
      </Suspense>
    </Container>
  )
}

export default Layout
