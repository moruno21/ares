import Button from '@ares/ui/components/Button'
import { Body1 } from '@ares/ui/components/Text'
import { FieldArray, Form, Formik } from 'formik'

import { validationSchema } from './constants'
import Header from './Header'
import useLayout from './hooks'
import { Container, Content, Workouts } from './styles'
import Workout from './Workout'

Header
const Layout = () => {
  const { handleSubmit, initialValues, routine, t } = useLayout()

  return (
    <Container>
      {routine ? (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnBlur={false}
          validateOnMount
          validateOnChange={true}
          validationSchema={validationSchema}
        >
          <Form>
            <Content>
              <Header
                name={routine.name}
                description={routine.description}
              ></Header>
              {routine.workouts.length < 1 ? (
                <Body1>{t('no_workouts')}</Body1>
              ) : (
                <FieldArray name="workouts">
                  {(arrayHelpers) => (
                    <>
                      <Workouts>
                        {routine.workouts.map(
                          ({ exerciseId, exerciseName, reps, sets }, index) => (
                            <Workout
                              exerciseId={exerciseId}
                              exerciseName={exerciseName ?? ''}
                              handleDeleteWorkout={arrayHelpers.remove}
                              index={index}
                              key={index}
                              reps={reps}
                              sets={sets}
                            />
                          ),
                        )}
                      </Workouts>
                      <Button>Add new Workout</Button>
                    </>
                  )}
                </FieldArray>
              )}
            </Content>
          </Form>
        </Formik>
      ) : null}
    </Container>
  )
}

export default Layout
