import { GoogleLogin } from '@react-oauth/google'

import useLayout from './hooks'
import { Card, Container, Description, ErrorMessage, Title } from './styles'

const Layout = () => {
  const { error, handleError, handleSuccess, t } = useLayout()

  return (
    <Container>
      <Title>{t('title')}</Title>
      <Description>{t('description')}</Description>
      <Card>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </Card>
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </Container>
  )
}
export default Layout
