import { H1, H3 } from '@ares/ui/components/Text'
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
  CreateRoutineSection,
  Header,
  IconButton,
  Routines,
} from './styles'

const Layout = () => {
  const {
    handleCloseCreateRoutine,
    handleOpenCreateRoutine,
    handleSubmit,
    isCreateRoutineOpen,
    routines,
    t,
  } = useLayout()

  return (
    <Container>
      <Header>
        <H1>{t('title')}</H1>
        <H3>{t('description')}</H3>
      </Header>
      <CreateRoutineSection>
        {isCreateRoutineOpen ? (
          <Card>
            <IconButton onClick={handleCloseCreateRoutine}>
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
          <Button onClick={handleOpenCreateRoutine}>{t('create.label')}</Button>
        )}
      </CreateRoutineSection>
      <Routines>
        {routines.map(({ description, id, name }) => (
          <Item id={id} description={description} key={id} name={name}></Item>
        ))}
      </Routines>
    </Container>
  )
}

export default Layout