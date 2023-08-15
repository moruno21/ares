import { ArrayHelpers } from 'formik'
import { HTMLAttributes } from 'react'

export type WorkoutProps = HTMLAttributes<HTMLDivElement> & {
  exerciseId: string
  exerciseName: string
  handleDeleteWorkout: ArrayHelpers['remove']
  index: number
  reps: number
  sets: number
}

export type UseWorkoutProps = {
  exerciseId: WorkoutProps['exerciseId']
  index: WorkoutProps['index']
}
