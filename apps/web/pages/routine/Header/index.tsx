import Button from '@ares/ui/components/Button'
import IconButton from '@ares/ui/components/IconButton'
import Input from '@ares/ui/components/Input'
import { ErrorMessage, Field as FormikField } from 'formik'
import { Suspense } from 'react'
import { Trans } from 'react-i18next'

import { ROUTES } from '~/services/routing/Routes/constants'

import {
  CopyIcon,
  CustomErrorMessage,
  DeleteIcon,
  EditIcon,
  Label,
} from '../styles'
import useHeader from './hooks'
import {
  Buttons,
  ChevronLeftIcon,
  Content,
  Description,
  ExternalIcon,
  Field,
  Fields,
  Footer,
  Form,
  Info,
  Modal,
  ShareLink,
  ShareModalDescription,
  Title,
} from './styles'
import { HeaderProps } from './types'

const Header = ({ description, name }: HeaderProps) => {
  const {
    handleCloseCopyModal,
    handleCloseDeleteModal,
    handleCloseShareModal,
    handleCopyRoutine,
    handleDeleteRoutine,
    handleGoBack,
    handleOpenCopyModal,
    handleOpenDeleteModal,
    handleOpenEditHeader,
    handleOpenShareModal,
    handleSaveHeader,
    idHash,
    isCopyModalOpen,
    isDeleteModalOpen,
    isEditHeaderOpen,
    isShareModalOpen,
    isUserOwnRoutine,
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
            {isUserOwnRoutine ? (
              <>
                <IconButton onClick={handleOpenEditHeader}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleOpenShareModal}>
                  <ExternalIcon />
                </IconButton>
                <IconButton onClick={handleOpenDeleteModal}>
                  <DeleteIcon />
                </IconButton>
              </>
            ) : (
              <IconButton onClick={handleOpenCopyModal}>
                <CopyIcon />
              </IconButton>
            )}
          </Buttons>
          <Suspense>
            {isCopyModalOpen ? (
              <Modal
                close-aria-label={t('copy_modal.close')}
                footer={
                  <Footer>
                    <Button variant="secondary" onClick={handleCloseCopyModal}>
                      {t('copy_modal.buttons.cancel.label')}
                    </Button>
                    <Button onClick={handleCopyRoutine}>
                      {t('copy_modal.buttons.copy.label')}
                    </Button>
                  </Footer>
                }
                id="share_routine_modal"
                onClose={handleCloseCopyModal}
                title={t('copy_modal.title')}
              >
                {t('copy_modal.description')}
              </Modal>
            ) : null}
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
            {isShareModalOpen ? (
              <Modal
                close-aria-label={t('share_modal.close')}
                footer={
                  <Footer>
                    <Button onClick={handleCloseShareModal}>
                      {t('share_modal.buttons.got_it.label')}
                    </Button>
                  </Footer>
                }
                id="share_routine_modal"
                onClose={handleCloseShareModal}
                title={t('share_modal.title')}
              >
                <ShareModalDescription>
                  {t('share_modal.description')}
                  <ShareLink
                    rel="noopener noreferrer"
                    target="_blank"
                    to={`${ROUTES.LANDING}/${idHash}`}
                  >
                    {`${window.location.origin}${ROUTES.LANDING}/${idHash}`}
                  </ShareLink>
                </ShareModalDescription>
              </Modal>
            ) : null}
          </Suspense>
        </Content>
      )}
    </>
  )
}

export default Header
