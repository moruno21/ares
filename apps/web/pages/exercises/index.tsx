import { H1, H3 } from '@ares/ui/components/Text'
import { Formik } from 'formik'

import { initialValues, validationSchema } from './constants'
import ExerciseCard from './ExerciseCard'
import useExercises from './hooks'
import InputField from './InputField'
import {
  Button,
  Card,
  CloseButton,
  CloseIcon,
  Container,
  CreateExerciseSection,
  CustomErrorMessage,
  ExerciseCards,
  ExerciseForm,
  ExerciseFormSection,
  Fields,
  Header,
} from './styles'

const Exercises = () => {
  const {
    createError,
    exercises,
    handleCloseCreateExercise,
    handleOpenCreateExercise,
    handleSubmit,
    isCreateError,
    isCreateExerciseOpen,
    t,
  } = useExercises()

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
              <CloseButton onClick={handleCloseCreateExercise}>
                <CloseIcon />
              </CloseButton>
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
            key={id}
            description={description}
            id={id}
            name={name}
          ></ExerciseCard>
        ))}
      </ExerciseCards>
    </Container>
  )
}

export default Exercises
