export type Values = {
  description: string
  name: string
  workouts: Workout[]
}

export type Workout = {
  exerciseDescription: string
  exerciseId: string
  exerciseName: string
  reps: number
  sets: number
}
