import { H3 } from '@ares/ui/components/Text'
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
  EmptyMessage,
  Header,
  IconButton,
  Routines,
  Title,
} from './styles'

const Layout = () => {
  const {
    handleCloseCreateRoutine,
    handleOpenCreateRoutine,
    handleSubmit,
    isCreateRoutineOpen,
    isUserOwnRoutines,
    routines,
    t,
  } = useLayout()

  return (
    <Container>
      <Header>
        {isUserOwnRoutines ? (
          <>
            <Title>{t('title')}</Title>
            <H3>{t('description')}</H3>
          </>
        ) : (
          <Title>{t('other_user_routines')}</Title>
        )}
      </Header>
      {routines.length < 1 && !isCreateRoutineOpen ? (
        <EmptyMessage>{t('no_routines')}</EmptyMessage>
      ) : null}
      {isUserOwnRoutines ? (
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
            <Button onClick={handleOpenCreateRoutine}>
              {t('create.label')}
            </Button>
          )}
        </CreateRoutineSection>
      ) : null}
      <Routines>
        {routines.map(({ description, id, name }) => (
          <Item id={id} description={description} key={id} name={name}></Item>
        ))}
      </Routines>
    </Container>
  )
}

export default Layout
