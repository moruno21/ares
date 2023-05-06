import GlobalStyles from '@ares/ui/styles/global'
import theme from '@ares/ui/styles/theme'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import AppRoutes from './services/routing/Routes'

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </ThemeProvider>
)

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
