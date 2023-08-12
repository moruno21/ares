import { HTMLAttributes } from 'react'

export type InputFieldProps = HTMLAttributes<HTMLDivElement> & {
  name: string
  placeholder: string
}

export type UseInputFieldProps = {
  name: InputFieldProps['name']
}
