import './config/i18n'

import { ApolloProvider } from '@apollo/client'
import GlobalStyles from '@ares/ui/styles/global'
import theme from '@ares/ui/styles/theme'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import googleOauthConfig from '~/config/google-oauth'
import client from '~/graphql/client'
import AppRoutes from '~/services/routing/Routes'

const App = () => (
  <GoogleOAuthProvider clientId={googleOauthConfig.clientId}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <ApolloProvider client={client}>
          <AppRoutes />
        </ApolloProvider>
      </BrowserRouter>
    </ThemeProvider>
  </GoogleOAuthProvider>
)

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
