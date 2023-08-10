import { HTMLAttributes } from 'react'

export type ExerciseCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'id'> & {
  description: string
  id: string
  name: string
}

export type UseExerciseCardProps = {
  description: ExerciseCardProps['description']
  id: ExerciseCardProps['id']
  name: ExerciseCardProps['name']
}
