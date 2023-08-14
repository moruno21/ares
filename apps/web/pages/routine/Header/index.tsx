import Button from '@ares/ui/components/Button'
import IconButton from '@ares/ui/components/IconButton'
import Input from '@ares/ui/components/Input'
import { ErrorMessage, Field as FormikField } from 'formik'
import { Suspense } from 'react'
import { Trans } from 'react-i18next'

import { CustomErrorMessage } from '../styles'
import useHeader from './hooks'
import {
  Buttons,
  ChevronLeftIcon,
  Content,
  DeleteIcon,
  Description,
  EditIcon,
  Field,
  Fields,
  Footer,
  Form,
  Info,
  Label,
  Modal,
  Title,
} from './styles'
import { HeaderProps } from './types'

const Header = ({ description, name }: HeaderProps) => {
  const {
    handleCloseDeleteModal,
    handleDeleteRoutine,
    handleGoBack,
    handleOpenDeleteModal,
    handleOpenEditHeader,
    handleSaveHeader,
    isDeleteModalOpen,
    isEditHeaderOpen,
    t,
  } = useHeader()

  return (
    <>
      {isEditHeaderOpen ? (
        <Form>
          <Fields>
            <Field>
              <Label htmlFor="routine_name">
                {t('header_form.inputs.name.label')}
              </Label>
              <FormikField
                as={Input}
                id="routine_name"
                name="name"
                placeholder={t('header_form.inputs.name.placeholder')}
              />
              <ErrorMessage name="name">
                {(msg) => <CustomErrorMessage>{msg}</CustomErrorMessage>}
              </ErrorMessage>
            </Field>
            <Field>
              <Label htmlFor="routine_description">
                {t('header_form.inputs.description.label')}
              </Label>
              <FormikField
                as={Input}
                id="routine_description"
                name="description"
                placeholder={t('header_form.inputs.description.placeholder')}
              />
              <ErrorMessage name="description">
                {(msg) => <CustomErrorMessage>{msg}</CustomErrorMessage>}
              </ErrorMessage>
            </Field>
          </Fields>
          <Button onClick={handleSaveHeader} type="submit">
            {t('header_form.save.label')}
          </Button>
        </Form>
      ) : (
        <Content>
          <Info>
            <Title>{name}</Title>
            <Description>{description}</Description>
          </Info>
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
        </Content>
      )}
    </>
  )
}

export default Header
