import { HTMLAttributes } from 'react'

export type WorkoutProps = HTMLAttributes<HTMLDivElement> & {
  exerciseName: string
  index: number
  reps: number
  sets: number
}
