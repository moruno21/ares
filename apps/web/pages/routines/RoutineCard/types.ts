import { HTMLAttributes } from 'react'

export type RoutineCardProps = Omit<HTMLAttributes<HTMLAnchorElement>, 'id'> & {
  description: string
  id: string
  name: string
}
