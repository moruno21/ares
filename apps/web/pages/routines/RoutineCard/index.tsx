import useRoutineCard from './hooks'
import { Container, RoutineDescription, RoutineName } from './styles'
import { RoutineCardProps } from './types'

const RoutineCard = ({ description, id, name }: RoutineCardProps) => {
  const { href } = useRoutineCard({ id })

  return (
    <Container href={href}>
      <RoutineName>{name}</RoutineName>
      <RoutineDescription>{description} </RoutineDescription>
    </Container>
  )
}

export default RoutineCard
