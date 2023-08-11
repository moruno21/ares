import { HTMLAttributes } from 'react'

export type WorkoutProps = HTMLAttributes<HTMLDivElement> & {
  exerciseName: string
  reps: number
  sets: number
}
