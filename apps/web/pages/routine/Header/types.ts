import { HTMLAttributes } from 'react'

export type HeaderProps = HTMLAttributes<HTMLDivElement> & {
  description: string
  name: string
}

export type UseHeaderProps = {
  description: HeaderProps['description']
  name: HeaderProps['name']
}
