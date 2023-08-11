import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { InputProps } from '../Input'
import { UseDropdownProps } from './types'

export const useDropdown = ({
  autoFocus,
  onChange,
  options = [],
  value,
}: UseDropdownProps) => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [expanded, setExpanded] = useState(false)

  const valueOption = useMemo(
    () =>
      value ? options.find((option) => option.value === value) : undefined,
    [options, value],
  )

  const [inputValue, setInputValue] = useState(valueOption?.text)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const filteredOptions = useMemo(
    () =>
      inputValue
        ? options.filter(({ text }) =>
            text.toLowerCase().includes(inputValue.toLowerCase()),
          )
        : options,
    [inputValue, options],
  )

  const overflowed = filteredOptions.length > 5

  const handleSetOptionIndex = useCallback((index: number) => {
    setActiveIndex(index)
    listRef.current?.scrollTo({ top: index * 36 })
  }, [])

  const handleInputBlur = useCallback(() => {
    setExpanded(false)
    setInputValue(valueOption?.text)
    handleSetOptionIndex(-1)
  }, [handleSetOptionIndex, valueOption?.text])

  const handleInputChange: NonNullable<InputProps['onChange']> = useCallback(
    ({ target }) => {
      setInputValue(target.value)
      handleSetOptionIndex(0)
    },
    [handleSetOptionIndex],
  )

  const handleInputFocus = useCallback(() => {
    setExpanded(true)
    setInputValue(undefined)
  }, [])

  const handleInputKeyDown: NonNullable<InputProps['onKeyDown']> = useCallback(
    (event) => {
      if (!['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key))
        return

      event.preventDefault()
      event.stopPropagation()

      switch (event.key) {
        case 'ArrowDown':
          return handleSetOptionIndex(
            (activeIndex + 1) % filteredOptions.length,
          )
        case 'ArrowUp':
          return handleSetOptionIndex(
            activeIndex > 0 ? activeIndex - 1 : filteredOptions.length - 1,
          )
        case 'Enter':
          event.currentTarget.blur()
          onChange(filteredOptions[activeIndex]?.value)
          return
        case 'Escape':
          return event.currentTarget.blur()
      }
    },
    [activeIndex, filteredOptions, handleSetOptionIndex, onChange],
  )

  const handleOptionClick: MouseEventHandler<HTMLLIElement> = useCallback(
    ({ currentTarget: { dataset } }) => onChange(dataset.value),
    [onChange],
  )

  const handleToggle: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()

      if (expanded) inputRef.current?.blur()
      else inputRef.current?.focus()
    },
    [expanded],
  )

  useEffect(() => setInputValue(valueOption?.text), [valueOption?.text])

  useEffect(() => {
    if (!autoFocus) return

    setInputValue(undefined)
  }, [autoFocus])

  return {
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
  }
}
