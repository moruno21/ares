import { H3 } from '@ares/ui/components/Text'
import { Formik } from 'formik'

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
  IconButton,
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
