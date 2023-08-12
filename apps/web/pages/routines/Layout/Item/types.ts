import { HTMLAttributes } from 'react'

export type ItemProps = Omit<HTMLAttributes<HTMLAnchorElement>, 'id'> & {
  description: string
  id: string
  name: string
}
