import { InputProps } from '../Input'

export type DropdownOption = {
  text: string
  value: string
}

export type DropdownProps = Omit<InputProps, 'onChange' | 'type' | 'value'> & {
  noResultsMessage: string
  onChange: (value?: string) => void
  options?: DropdownOption[]
  value?: string
}

export type ListProps = {
  $overflowed?: boolean
}

export type UseDropdownProps = {
  autoFocus: DropdownProps['autoFocus']
  onChange: DropdownProps['onChange']
  options: DropdownProps['options']
  value: DropdownProps['value']
}
