import { ArrowRightIcon, Container, Name } from './styles'
import { UserCardProps } from './types'

const UserCard = ({ name }: UserCardProps) => {
  return (
    <Container>
      <Name>{name}</Name>
      <ArrowRightIcon />
    </Container>
  )
}

export default UserCard
