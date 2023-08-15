import DefaultDropdown from '@ares/ui/components/Dropdown'
import Input from '@ares/ui/components/Input'
import pxToRem from '@ares/ui/lib/px-to-rem'
import styled from 'styled-components'

export const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
`

export const Container = styled.div`
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.light};
  padding: 2rem;
`

export const Content = styled.div`
  display: grid;
  gap: 2rem;
  grid-auto-flow: column;
  grid-template-columns: 1fr min-content;

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.medium)}) {
    grid-auto-flow: revert;
    grid-template-columns: none;
    justify-items: center;
  }
`

export const Dropdown = styled(DefaultDropdown)`
  max-width: 12rem;
`

export const Field = styled.div`
  align-items: center;
  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
  grid-template-columns: min-content 1fr;
  justify-content: start;
`

export const Form = styled.div`
  display: grid;
  gap: 2rem;
`

export const Info = styled.div`
  display: grid;
  gap: 2rem;
`

export const InputUnit = styled(Input)`
  width: 3.5rem;

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    opacity: 1;
  }
`

export const WorkoutSettings = styled.div`
  display: grid;
  gap: 2.5rem;
  grid-auto-flow: column;
  justify-content: start;
`
