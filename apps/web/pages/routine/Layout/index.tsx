import { Body1 } from '@ares/ui/components/Text'

import Header from '../Header'
import Workout from '../Workout'
import useLayout from './hooks'
import { Container, Content, Workouts } from './styles'

const Routine = () => {
  const { routine, t } = useLayout()

  return (
    <Container>
      {routine ? (
        <Content>
          <Header
            id={routine.id}
            description={routine.description}
            name={routine.name}
          />
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
