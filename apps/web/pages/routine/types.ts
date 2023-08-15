export type Routine = {
  description: string
  name: string
  workouts: {
    exerciseId: string
    reps: number
    sets: number
  }[]
}
