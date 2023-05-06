import GlobalStyles from '@ares/ui/styles/global'
import theme from '@ares/ui/styles/theme'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    Hello World
  </ThemeProvider>
)

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
