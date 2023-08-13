import Button from '@ares/ui/components/Button'
import IconButton from '@ares/ui/components/IconButton'
import Input from '@ares/ui/components/Input'
import { Body1 } from '@ares/ui/components/Text'
import { ErrorMessage, Field as FormikField, Form, Formik } from 'formik'
import { Suspense } from 'react'
import { Trans } from 'react-i18next'

import { validationSchema } from './constants'
import useLayout from './hooks'
import {
  Buttons,
  ChevronLeftIcon,
  Container,
  Content,
  CustomErrorMessage,
  DeleteIcon,
  Description,
  EditIcon,
  Field,
  Fields,
  Footer,
  Header,
  HeaderForm,
  Info,
  Label,
  Modal,
  Title,
  Workouts,
} from './styles'
import Workout from './Workout'

const Layout = () => {
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
    routine,
    t,
  } = useLayout()

  return (
    <Container>
      {routine ? (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnBlur={true}
          validateOnMount
          validationSchema={validationSchema}
        >
          <Form>
            <Content>
              {isEditHeaderOpen ? (
                <HeaderForm>
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
                        {(msg) => (
                          <CustomErrorMessage>{msg}</CustomErrorMessage>
                        )}
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
                        placeholder={t(
                          'header_form.inputs.description.placeholder',
                        )}
                      />
                      <ErrorMessage name="description">
                        {(msg) => (
                          <CustomErrorMessage>{msg}</CustomErrorMessage>
                        )}
                      </ErrorMessage>
                    </Field>
                  </Fields>
                  <Button type="submit">{t('header_form.save.label')}</Button>
                </HeaderForm>
              ) : (
                <Header>
                  <Info>
                    <Title>{routine.name}</Title>
                    <Description>{routine.description}</Description>
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
                            values={{ name: routine.name }}
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
                            values={{ name: routine.name }}
                          />
                        </span>
                      </Modal>
                    ) : null}
                  </Suspense>
                </Header>
              )}
              {routine.workouts.length < 1 ? (
                <Body1>{t('no_workouts')}</Body1>
              ) : (
                <Workouts>
                  {routine.workouts.map(
                    ({ exerciseName, reps, sets }, index) => (
                      <Workout
                        exerciseName={exerciseName ?? ''}
                        key={index}
                        reps={reps}
                        sets={sets}
                      />
                    ),
                  )}
                </Workouts>
              )}
            </Content>
          </Form>
        </Formik>
      ) : null}
    </Container>
  )
}

export default Layout
