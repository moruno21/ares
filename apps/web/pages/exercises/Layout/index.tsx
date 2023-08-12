import { H1, H3 } from '@ares/ui/components/Text'
import { Formik } from 'formik'

import { initialValues, validationSchema } from './constants'
import ExerciseCard from './ExerciseCard'
import useLayout from './hooks'
import InputField from './InputField'
import {
  Button,
  Card,
  CloseIcon,
  Container,
  CreateExerciseSection,
  CustomErrorMessage,
  ExerciseCards,
  ExerciseForm,
  ExerciseFormSection,
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
    isCreateError,
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
            <ExerciseFormSection>
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
                  {isCreateError ? (
                    <CustomErrorMessage>{createError}</CustomErrorMessage>
                  ) : null}
                </ExerciseForm>
              </Formik>
            </ExerciseFormSection>
          </Card>
        ) : (
          <Button onClick={handleOpenCreateExercise}>
            {t('exercise.form.buttons.create.label')}
          </Button>
        )}
      </CreateExerciseSection>
      <ExerciseCards>
        {exercises.map(({ description, id, name }) => (
          <ExerciseCard
            description={description}
            id={id}
            key={id}
            name={name}
          ></ExerciseCard>
        ))}
      </ExerciseCards>
    </Container>
  )
}

export default Layout
