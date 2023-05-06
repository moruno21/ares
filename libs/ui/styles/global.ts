import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    //Variables go here
  }

  * {
    box-sizing: border-box;

    ::after,
    ::before {
      box-sizing: border-box;
    }
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
