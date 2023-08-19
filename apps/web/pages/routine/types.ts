export type Routine = {
  description: string
  name: string
  ownerId: string
  workouts: {
    exerciseId: string
    reps: number
    sets: number
  }[]
}
