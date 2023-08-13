import { HTMLAttributes } from 'react'

export type HeaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'id'> & {
  description: string
  id: string
  name: string
}

export type UseHeaderProps = {
  description: HeaderProps['description']
  id: HeaderProps['id']
  name: HeaderProps['name']
}

export type Values = {
  description: string
  name: string
}
