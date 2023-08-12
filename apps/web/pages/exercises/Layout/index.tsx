import { H1, H3 } from '@ares/ui/components/Text'
import { Formik } from 'formik'

import Form from '../Form'
import Item from '../Item'
import { initialValues, validationSchema } from './constants'
import useLayout from './hooks'
import {
  Button,
  Card,
  CloseIcon,
  Container,
  CreateExerciseSection,
  Exercises,
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
              <Form error={createError} />
            </Formik>
          </Card>
        ) : (
          <Button onClick={handleOpenCreateExercise}>
            {t('create.label')}
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
