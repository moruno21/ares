import ExerciseCard from './ExerciseCard'
import useExercises from './hooks'
import { Container, Description, ExerciseCards, Header, Title } from './styles'

const Exercises = () => {
  const { exercises, t } = useExercises()

  return (
    <Container>
      <Header>
        <Title>{t('title')}</Title>
        <Description>{t('description')}</Description>
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
