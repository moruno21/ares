import { ArrayHelpers } from 'formik'
import { HTMLAttributes } from 'react'

export type WorkoutProps = HTMLAttributes<HTMLDivElement> & {
  exerciseName: string
  handleDeleteWorkout: ArrayHelpers['remove']
  index: number
  reps: number
  sets: number
}
