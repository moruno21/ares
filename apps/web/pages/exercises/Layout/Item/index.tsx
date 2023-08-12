import Button from '@ares/ui/components/Button'
import { H3 } from '@ares/ui/components/Text'
import { Formik } from 'formik'

import { validationSchema } from '../constants'
import InputField from '../InputField'
import {
  CloseIcon,
  CustomErrorMessage,
  ExerciseForm,
  Fields,
  IconButton,
} from '../styles'
import useExercise from './hooks'
import {
  CardButtons,
  Container,
  Content,
  DeleteIcon,
  Description,
  EditIcon,
  Info,
} from './styles'
import { ItemProps } from './types'

const Item = ({ description, id, name }: ItemProps) => {
  const {
    editError,
    handleCloseEditExercise,
    handleDeleteExercise,
    handleOpenEditExercise,
    handleSubmit,
    initialValues,
    isEditExerciseOpen,
    t,
  } = useExercise({ description, id, name })

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
              {editError ? (
                <CustomErrorMessage>{editError}</CustomErrorMessage>
              ) : null}
            </ExerciseForm>
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
            <IconButton onClick={handleDeleteExercise}>
              <DeleteIcon />
            </IconButton>
          </CardButtons>
        </Content>
      )}
    </Container>
  )
}

export default Item
