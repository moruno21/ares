import styled from 'styled-components'

export const Container = styled.div`
  margin: auto;
  max-width: 45rem;
`

export const Content = styled.div`
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.light};
  display: grid;
  gap: 4.5rem;
  padding: 2rem;
`

export const Workouts = styled.div`
  display: grid;
  gap: 2rem;
`
