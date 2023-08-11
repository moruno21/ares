import styled from 'styled-components'

export const Container = styled.div`
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.light};
  padding: 2rem;
`

export const Field = styled.div`
  align-items: baseline;
  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
  justify-content: start;
`

export const Info = styled.div`
  display: grid;
  gap: 2rem;
`

export const WorkoutSettings = styled.div`
  display: grid;
  gap: 2.5rem;
  grid-auto-flow: column;
  justify-content: start;
`
