import { HTMLAttributes } from 'react'

export type HeaderProps = HTMLAttributes<HTMLDivElement> & {
  description: string
  name: string
}
