import { HTMLAttributes } from 'react'

export type ExerciseCardProps = HTMLAttributes<HTMLDivElement> & {
  description: string
  name: string
}
