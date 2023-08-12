import { HTMLAttributes } from 'react'

export type HeaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'id'> & {
  description: string
  id: string
  name: string
}

export type UseHeaderProps = {
  id: HeaderProps['id']
}
