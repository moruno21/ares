import Button from '@ares/ui/components/Button'
import IconButton from '@ares/ui/components/IconButton'
import { Formik } from 'formik'
import { Suspense } from 'react'
import { Trans } from 'react-i18next'

import { validationSchema } from './constants'
import Form from './Form'
import useHeader from './hooks'
import {
  Buttons,
  ChevronLeftIcon,
  Container,
  DeleteIcon,
  Description,
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
    handleGoBack,
    handleOpenDeleteModal,
    handleOpenEditHeader,
    handleSubmit,
    initialValues,
    isDeleteModalOpen,
    isEditHeaderOpen,
    t,
  } = useHeader({ description, id, name })

  return (
    <Container>
      {isEditHeaderOpen ? (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnBlur={true}
          validateOnMount
          validationSchema={validationSchema}
        >
          <Form />
        </Formik>
      ) : (
        <>
          <Title>{name}</Title>
          <Description>{description}</Description>
          <Buttons>
            <IconButton onClick={handleGoBack}>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton onClick={handleOpenEditHeader}>
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
                    <Button
                      onClick={handleCloseDeleteModal}
                      variant="secondary"
                    >
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
        </>
      )}
    </Container>
  )
}

export default Header
