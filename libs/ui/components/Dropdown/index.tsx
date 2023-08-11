import { memo } from 'react'

import { ReactComponent as ChevronDownIcon } from '../../assets/icons/chevron-down.svg'
import { Input1 } from '../Text'
import { useDropdown } from './hooks'
import {
  Component,
  Container,
  Input,
  InputContainer,
  List,
  Message,
  Option,
  Toggle,
} from './styles'
import { DropdownOption, DropdownProps } from './types'

const Dropdown = ({
  autoFocus,
  className,
  disabled,
  noResultsMessage,
  onChange,
  options,
  placeholder,
  value,
  ...props
}: DropdownProps) => {
  const {
    activeIndex,
    expanded,
    filteredOptions,
    handleInputBlur,
    handleInputChange,
    handleInputFocus,
    handleInputKeyDown,
    handleOptionClick,
    handleToggle,
    inputRef,
    inputValue,
    listRef,
    overflowed,
    valueOption,
  } = useDropdown({ autoFocus, onChange, options, value })

  return (
    <Container className={className}>
      <Component
        aria-disabled={disabled}
        aria-expanded={expanded}
        role="combobox"
      >
        <InputContainer>
          <Input
            aria-autocomplete="list"
            autoComplete="off"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
            disabled={disabled}
            onBlur={handleInputBlur}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
            placeholder={valueOption?.text ?? placeholder}
            ref={inputRef}
            value={inputValue ?? ''}
            {...props}
          />
          <Toggle
            aria-hidden
            disabled={disabled}
            onMouseDown={handleToggle}
            tabIndex={-1}
            type="button"
          >
            <ChevronDownIcon />
          </Toggle>
        </InputContainer>
        {expanded ? (
          <List
            $overflowed={overflowed}
            aria-activedescendant={filteredOptions[activeIndex]?.value}
            ref={listRef}
            role="listbox"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <Option
                  aria-current={
                    option.value === filteredOptions[activeIndex]?.value
                  }
                  aria-selected={option.value === valueOption?.value}
                  data-value={option.value}
                  key={option.value}
                  onMouseDown={handleOptionClick}
                  role="option"
                >
                  <Input1>{option.text}</Input1>
                </Option>
              ))
            ) : (
              <Message>{noResultsMessage}</Message>
            )}
          </List>
        ) : null}
      </Component>
    </Container>
  )
}

export default memo(Dropdown)

export type { DropdownOption, DropdownProps }
