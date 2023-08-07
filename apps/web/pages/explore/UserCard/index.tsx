import { H3 } from '@ares/ui/components/Text'

import { ArrowRightIcon, Container } from './styles'
import { UserCardProps } from './types'

const UserCard = ({ name }: UserCardProps) => {
  return (
    <Container>
      <H3>{name}</H3>
      <ArrowRightIcon />
    </Container>
  )
}

export default UserCard
