import { Body1 } from '../../../../libs/ui/components/Text'
import Header from './Header'
import useRoutine from './hooks'
import { Container, Content, Workouts } from './styles'
import Workout from './Workout'

const Routine = () => {
  const { routine, t } = useRoutine()

  return (
    <Container>
      {routine ? (
        <Content>
          <Header description={routine.description} name={routine.name} />
          {routine.workouts.length > 0 ? (
            <Workouts>
              {routine.workouts.map(({ exerciseName, reps, sets }, index) => (
                <Workout
                  exerciseName={exerciseName}
                  key={index}
                  reps={reps}
                  sets={sets}
                />
              ))}
            </Workouts>
          ) : (
            <Body1>{t('no_workouts')}</Body1>
          )}
        </Content>
      ) : null}
    </Container>
  )
}

export default Routine
