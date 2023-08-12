import { HTMLAttributes } from 'react'

export type FormProps = HTMLAttributes<HTMLDivElement> & {
  error?: string
}
