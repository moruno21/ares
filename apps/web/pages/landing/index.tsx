import { H1, H3, H4 } from '@ares/ui/components/Text'

import useLayout from './hooks'
import {
  Container,
  Field,
  Header,
  NotFoundMessage,
  Routine,
  Settings,
  Workout,
  Workouts,
} from './styles'

const Layout = ({}) => {
  const { routine, t } = useLayout()

  return (
    <Container>
      {routine ? (
        <Routine>
          <Header>
            <H1>{routine.name}</H1>
            <H3>{routine.description}</H3>
          </Header>
          {routine.workouts.length < 1 ? (
            <>{t('no_workouts')}</>
          ) : (
            <Workouts>
              {routine.workouts.map(({ exerciseName, reps, sets }, index) => (
                <Workout key={index}>
                  <Field>
                    <H4>{t('workout.exercise_name.label')}</H4>
                    {exerciseName}
                  </Field>
                  <Settings>
                    <Field>
                      <H4>{t('workout.sets.label')}</H4>
                      {sets}
                    </Field>
                    <Field>
                      <H4>{t('workout.reps.label')}</H4>
                      {reps}
                    </Field>
                  </Settings>
                </Workout>
              ))}
            </Workouts>
          )}
        </Routine>
      ) : (
        <NotFoundMessage>{t('not_found')}</NotFoundMessage>
      )}
    </Container>
  )
}

export default Layout
