import { H1, H3 } from '@ares/ui/components/Text'
import { Formik } from 'formik'

import { initialValues, validationSchema } from './constants'
import useLayout from './hooks'
import InputField from './InputField'
import Item from './Item'
import {
  Button,
  Card,
  CloseIcon,
  Container,
  CreateExerciseSection,
  CustomErrorMessage,
  ExerciseForm,
  Exercises,
  Fields,
  Header,
  IconButton,
} from './styles'

const Layout = () => {
  const {
    createError,
    exercises,
    handleCloseCreateExercise,
    handleOpenCreateExercise,
    handleSubmit,
    isCreateExerciseOpen,
    t,
  } = useLayout()

  return (
    <Container>
      <Header>
        <H1>{t('title')}</H1>
        <H3>{t('description')}</H3>
      </Header>
      <CreateExerciseSection>
        {isCreateExerciseOpen ? (
          <Card>
            <IconButton onClick={handleCloseCreateExercise}>
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
              <ExerciseForm>
                <Fields>
                  <InputField
                    name="name"
                    placeholder={t('exercise.form.inputs.name.placeholder')}
                  />
                  <InputField
                    name="description"
                    placeholder={t(
                      'exercise.form.inputs.description.placeholder',
                    )}
                  />
                </Fields>
                <Button type="submit">
                  {t('exercise.form.buttons.save.label')}
                </Button>
                {createError ? (
                  <CustomErrorMessage>{createError}</CustomErrorMessage>
                ) : null}
              </ExerciseForm>
            </Formik>
          </Card>
        ) : (
          <Button onClick={handleOpenCreateExercise}>
            {t('exercise.form.buttons.create.label')}
          </Button>
        )}
      </CreateExerciseSection>
      <Exercises>
        {exercises.map(({ description, id, name }) => (
          <Item description={description} id={id} key={id} name={name}></Item>
        ))}
      </Exercises>
    </Container>
  )
}

export default Layout
