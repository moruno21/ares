export type Values = {
  description: string
  name: string
  workouts: {
    exerciseId: string
    reps: number
    sets: number
  }[]
}
