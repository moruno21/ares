import useRoutineCard from './hooks'
import { Container, Description, Name } from './styles'
import { RoutineCardProps } from './types'

const RoutineCard = ({ description, id, name }: RoutineCardProps) => {
  const { href } = useRoutineCard({ id })

  return (
    <Container href={href}>
      <Name>{name}</Name>
      <Description>{description} </Description>
    </Container>
  )
}

export default RoutineCard
