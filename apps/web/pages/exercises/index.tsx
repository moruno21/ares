import { H1 } from '@ares/ui/components/Text'
import { Formik } from 'formik'

import { initialValues, validationSchema } from './constants'
import Form from './Form'
import useLayout from './hooks'
import Item from './Item'
import {
  Button,
  Card,
  CloseIcon,
  Container,
  CreateExerciseSection,
  Description,
  EmptyMessage,
  Exercises,
  Header,
  IconButton,
} from './styles'

const Layout = () => {
  const {
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
        <Description>{t('description')}</Description>
      </Header>
      {exercises.length < 1 && !isCreateExerciseOpen ? (
        <EmptyMessage>{t('no_exercises')}</EmptyMessage>
      ) : null}
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
              <Form />
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
