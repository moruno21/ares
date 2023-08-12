import Button from '@ares/ui/components/Button'
import { H3 } from '@ares/ui/components/Text'
import { Formik } from 'formik'
import { Suspense } from 'react'
import { Trans } from 'react-i18next'

import Form from '../Form'
import { validationSchema } from './constants'
import useItem from './hooks'
import {
  CardButtons,
  CloseIcon,
  Container,
  Content,
  DeleteIcon,
  Description,
  EditIcon,
  Footer,
  IconButton,
  Info,
  Modal,
} from './styles'
import { ItemProps } from './types'

const Item = ({ description, id, name }: ItemProps) => {
  const {
    editError,
    handleCloseDeleteModal,
    handleCloseEditExercise,
    handleDeleteExercise,
    handleOpenDeleteModal,
    handleOpenEditExercise,
    handleSubmit,
    initialValues,
    isDeleteModalOpen,
    isEditExerciseOpen,
    t,
  } = useItem({ description, id, name })

  return (
    <Container>
      {isEditExerciseOpen ? (
        <>
          <IconButton onClick={handleCloseEditExercise}>
            <CloseIcon />
          </IconButton>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnBlur={true}
            validateOnMount
            validationSchema={validationSchema}
          >
            <Form error={editError} />
          </Formik>
        </>
      ) : (
        <Content>
          <Info>
            <H3>{name}</H3>
            <Description>{description}</Description>
          </Info>
          <CardButtons>
            <IconButton onClick={handleOpenEditExercise}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleOpenDeleteModal}>
              <DeleteIcon />
            </IconButton>
          </CardButtons>
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
                    <Button onClick={handleDeleteExercise}>
                      {t('delete_modal.buttons.delete.label')}
                    </Button>
                  </Footer>
                }
                id="delete_exercise_modal"
                onClose={handleCloseDeleteModal}
                title={
                  <Trans i18nKey="delete_modal.title" t={t} values={{ name }} />
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
        </Content>
      )}
    </Container>
  )
}

export default Item
