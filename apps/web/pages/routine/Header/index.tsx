import Button from '@ares/ui/components/Button'
import IconButton from '@ares/ui/components/IconButton'
import { H1, H4 } from '@ares/ui/components/Text'
import { Suspense } from 'react'
import { Trans } from 'react-i18next'

import useHeader from './hooks'
import {
  Buttons,
  Container,
  DeleteIcon,
  EditIcon,
  Footer,
  Modal,
  Title,
} from './styles'
import { HeaderProps } from './types'

const Header = ({ description, id, name }: HeaderProps) => {
  const {
    handleCloseDeleteModal,
    handleDeleteRoutine,
    handleOpenDeleteModal,
    isDeleteModalOpen,
    t,
  } = useHeader({ id })

  return (
    <Container>
      <Title>
        <H1>{name}</H1>
        <Buttons>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleOpenDeleteModal}>
            <DeleteIcon />
          </IconButton>
        </Buttons>
        <Suspense>
          {isDeleteModalOpen ? (
            <Modal
              close-aria-label={t('delete_modal.close')}
              footer={
                <Footer>
                  <Button onClick={handleCloseDeleteModal} variant="secondary">
                    {t('delete_modal.buttons.cancel.label')}
                  </Button>
                  <Button onClick={handleDeleteRoutine}>
                    {t('delete_modal.buttons.delete.label')}
                  </Button>
                </Footer>
              }
              id="delete_routine_modal"
              onClose={handleCloseDeleteModal}
              title={
                <Trans
                  components={{
                    // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
                    em: <em />,
                  }}
                  i18nKey="delete_modal.title"
                  t={t}
                  values={{ name }}
                />
              }
            >
              <span>
                <Trans
                  components={{
                    // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
                    em: <em />,
                  }}
                  i18nKey="delete_modal.description"
                  t={t}
                  values={{ name }}
                />
              </span>
            </Modal>
          ) : null}
        </Suspense>
      </Title>
      <H4>{description}</H4>
    </Container>
  )
}

export default Header
