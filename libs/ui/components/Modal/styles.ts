import styled from 'styled-components'

import DefaultIconButton from '../IconButton'
import { H3 } from '../Text'

export const Body = styled.div`
  display: grid;
  gap: 3rem;
  padding: 1.5rem;
`

export const Component = styled.div`
  background-color: ${({ theme }) => theme.colors.background.white};
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.heavy};
  margin: auto;
  padding: 1.5rem;
  width: 41rem;
`

export const Content = styled.div`
  display: grid;
  gap: 1.5rem;
`

export const Dimmer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.dimmer};
  bottom: 0;
  display: flex;
  left: 0;
  outline: unset;
  overflow: auto;
  padding: 2rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 5;
`

export const IconButton = styled(DefaultIconButton)`
  color: ${({ theme }) => theme.colors.icon.main};
  display: block;
  margin-left: auto;
`

export const Title = styled(H3)`
  color: ${({ theme }) => theme.colors.text.main};
`
