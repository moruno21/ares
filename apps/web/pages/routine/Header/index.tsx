import IconButton from '@ares/ui/components/IconButton'
import { H1, H4 } from '@ares/ui/components/Text'

import { Buttons, Container, DeleteIcon, EditIcon, Title } from './styles'
import { HeaderProps } from './types'

const Header = ({ description, name }: HeaderProps) => {
  return (
    <Container>
      <Title>
        <H1>{name}</H1>
        <Buttons>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Buttons>
      </Title>
      <H4>{description}</H4>
    </Container>
  )
}

export default Header
