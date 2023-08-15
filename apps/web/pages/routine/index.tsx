import Button from '@ares/ui/components/Button'
import { Body1 } from '@ares/ui/components/Text'
import { FieldArray, Form, Formik } from 'formik'

import { validationSchema } from './constants'
import Header from './Header'
import useLayout from './hooks'
import { Container, Content, CustomErrorMessage, Workouts } from './styles'
import Workout from './Workout'

const Layout = () => {
  const { addWorkoutInitialValues, handleSubmit, initialValues, routine, t } =
    useLayout()

  console.log(addWorkoutInitialValues)

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
              <FieldArray name="workouts">
                {(arrayHelpers) => (
                  <>
                    {routine.workouts.length < 1 ? (
                      <Body1>{t('no_workouts')}</Body1>
                    ) : (
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
                    )}
                    {addWorkoutInitialValues ? (
                      <Button
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={() =>
                          arrayHelpers.push(addWorkoutInitialValues)
                        }
                        type="submit"
                      >
                        {t('add_workout.label')}
                      </Button>
                    ) : (
                      <CustomErrorMessage>
                        {t('add_workout.error')}
                      </CustomErrorMessage>
                    )}
                  </>
                )}
              </FieldArray>
            </Content>
          </Form>
        </Formik>
      ) : null}
    </Container>
  )
}

export default Layout
