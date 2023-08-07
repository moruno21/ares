import { HTMLAttributes } from 'react'

export type UserCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'id'> & {
  id: string
  name: string
}
