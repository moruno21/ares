import Button from '@ares/ui/components/Button'
import { H3 } from '@ares/ui/components/Text'
import { Formik } from 'formik'

import { validationSchema } from '../constants'
import InputField from '../InputField'
import {
  Card,
  CloseButton,
  CloseIcon,
  CustomErrorMessage,
  ExerciseForm,
  ExerciseFormSection,
  Fields,
} from '../styles'
import useExerciseCard from './hooks'
import {
  CardButtons,
  DeleteIcon,
  Description,
  EditIcon,
  Exercise,
  Info,
} from './styles'
import { ExerciseCardProps } from './types'

const ExerciseCard = ({ description, id, name }: ExerciseCardProps) => {
  const {
    editError,
    handleCloseEditExercise,
    handleDeleteExercise,
    handleOpenEditExercise,
    handleSubmit,
    initialValues,
    isEditError,
    isEditExerciseOpen,
    t,
  } = useExerciseCard({ description, id, name })

  return (
    <Card>
      {isEditExerciseOpen ? (
        <ExerciseFormSection>
          <CloseButton onClick={handleCloseEditExercise}>
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
              {isEditError ? (
                <CustomErrorMessage>{editError}</CustomErrorMessage>
              ) : null}
            </ExerciseForm>
          </Formik>
        </ExerciseFormSection>
      ) : (
        <Exercise>
          <Info>
            <H3>{name}</H3>
            <Description>{description}</Description>
          </Info>
          <CardButtons>
            <button onClick={handleOpenEditExercise}>
              <EditIcon />
            </button>
            <button onClick={handleDeleteExercise}>
              <DeleteIcon />
            </button>
          </CardButtons>
        </Exercise>
      )}
    </Card>
  )
}

export default ExerciseCard