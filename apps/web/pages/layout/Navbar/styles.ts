import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  bottom: 0;
  box-shadow: 0rem 0.6875rem 0.9375rem -0.4375rem rgba(55, 40, 102, 0.1),
    0rem 1.5rem 2.375rem 0.1875rem rgba(55, 40, 102, 0.07),
    0rem 0.5625rem 2.875rem 0.5rem rgba(55, 40, 102, 0.06);
  display: grid;
  height: 3rem;
  justify-items: center;
  padding: 0 3rem;
  position: fixed;
  width: 100%;
`

export const Item = styled(Link)`
  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
`

export const Menu = styled.div`
  align-items: center;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  max-width: 15rem;
  width: 100%;
`
