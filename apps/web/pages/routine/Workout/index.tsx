import { Body1, H4 } from '@ares/ui/components/Text'

import useWorkout from './hooks'
import { Container, Field, Info, WorkoutSettings } from './styles'
import { WorkoutProps } from './types'

const Workout = ({ exerciseName, reps, sets }: WorkoutProps) => {
  const { t } = useWorkout()

  return (
    <Container>
      <Info>
        <Field>
          <H4>{t('workout.exercise.name.label')}</H4>
          <Body1>{exerciseName}</Body1>
        </Field>
        <WorkoutSettings>
          <Field>
            <H4>{t('workout.sets.label')}</H4>
            <Body1>{reps}</Body1>
          </Field>
          <Field>
            <H4>{t('workout.reps.label')}</H4>
            <Body1>{sets}</Body1>
          </Field>
        </WorkoutSettings>
      </Info>
    </Container>
  )
}

export default Workout
