import { HTMLAttributes } from 'react'

export type RoutineProps = Omit<HTMLAttributes<HTMLAnchorElement>, 'id'> & {
  description: string
  id: string
  name: string
}
