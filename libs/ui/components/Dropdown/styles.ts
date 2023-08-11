import styled, { css } from 'styled-components'

import DefaultInput from '../Input'
import { Component as InputComponent } from '../Input/styles'
import { Input1, Input1Styles, Input2Styles } from '../Text'
import { ListProps } from './types'

export const Component = styled.div`
  border-radius: 0.5rem;
  box-sizing: content-box;
  display: grid;
  gap: 0.25rem;
  left: 0;
  margin: -0.5rem;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 100%;

  &[aria-expanded='true'] {
    background-color: ${({ theme }) => theme.colors.background.white};
    box-shadow: ${({ theme }) => theme.shadows.light};
    z-index: 1;
  }
`

export const Container = styled.div`
  height: 2.25rem;
  position: relative;
  width: 100%;
`

export const Input = styled(DefaultInput)`
  ${InputComponent} {
    padding-right: 2rem;
  }
`

export const InputContainer = styled.div`
  position: relative;
`

export const List = styled.ul<ListProps>`
  max-height: 11rem;
  overflow: auto;

  ${({ $overflowed }) =>
    $overflowed
      ? css`
          padding-right: 0.5rem;
        `
      : null}
`

export const Message = styled.div`
  ${Input1Styles}
  color: ${({ theme }) => theme.colors.text.neutral};
  padding: 0.5rem;
`

export const Option = styled.li`
  align-items: center;
  border-radius: 0.25rem;
  cursor: pointer;
  display: grid;
  gap: 0.5rem;
  padding: 0.5rem;

  &[aria-selected='true'] {
    ${Input2Styles}
  }

  &[aria-current='true'],
  :hover {
    background-color: ${({ theme }) => theme.colors.clickables.optionHover};
  }

  ${Input1} {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const Toggle = styled.button`
  height: 1rem;
  position: absolute;
  right: 0.5rem;
  top: 0.625rem;
  width: 1rem;

  :disabled {
    color: ${({ theme }) => theme.colors.text.disabled};
  }
`
