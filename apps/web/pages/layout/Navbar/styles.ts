import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.white};
  bottom: 0;
  box-shadow: ${({ theme }) => theme.shadows.heavy};
  display: grid;
  height: 3rem;
  justify-items: center;
  padding: 0 3rem;
  position: fixed;
  width: 100%;
`

export const Item = styled(Link)`
  align-content: center;
  border-radius: 0.5rem;
  display: grid;
  height: 2.5rem;
  justify-content: center;
  width: 2.5rem;

  &[aria-current] {
    background-color: ${({ theme }) => theme.colors.background.grey};
  }

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
