import './fonts.css'

import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    --color-blue-30: #35155d;
    --color-white: #ffffff;

    --font-primary: Public Sans, Arial, Helvetica, sans-serif;
    --font-secondary: Open Sans, Arial, Helvetica, sans-serif;
  }

  * {
    box-sizing: border-box;

    ::after,
    ::before {
      box-sizing: border-box;
    }
  }

  body {
    color: ${({ theme }) => theme.colors.text.main};
    font-family: ${({ theme }) => theme.font.families.primary}; 
  }

  html, body {
    height: 100%;
  }

  a {
    color: unset;
    cursor: pointer;
    outline: unset;
    text-decoration: unset;

    &[aria-disabled="true"] {
      cursor: unset;
    }
  }

  body {
    /* color: color; */
    /* font-family: font-family; */
  }

  button {
    cursor: pointer;
  }

  button, input, textarea {
    appearance: unset;
    background-color: unset;
    border: unset;
    color: unset;
    font: unset;
    margin: unset;
    outline: unset;
    padding: unset;

    :disabled {
      cursor: unset;
    }
  }
`

export default GlobalStyle
