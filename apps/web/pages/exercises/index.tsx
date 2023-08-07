import { H1, H3 } from '@ares/ui/components/Text'

import ExerciseCard from './ExerciseCard'
import useExercises from './hooks'
import { Container, ExerciseCards, Header } from './styles'

const Exercises = () => {
  const { exercises, t } = useExercises()

  return (
    <Container>
      <Header>
        <H1>{t('title')}</H1>
        <H3>{t('description')}</H3>
      </Header>
      <ExerciseCards>
        {exercises.map(({ description, id, name }) => (
          <ExerciseCard
            key={id}
            description={description}
            name={name}
          ></ExerciseCard>
        ))}
      </ExerciseCards>
    </Container>
  )
}

export default Exercises
