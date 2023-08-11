export type Maybe<T> = T
export type InputMaybe<T> = T
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  _Any: { input: any; output: any }
  Boolean: { input: boolean; output: boolean }
  federation__FieldSet: { input: any; output: any }
  Float: { input: number; output: number }
  ID: { input: string; output: string }
  Int: { input: number; output: number }
  link__Import: { input: any; output: any }
  String: { input: string; output: string }
}

export type Exercise = {
  __typename?: 'Exercise'
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type ExerciseInput = {
  description: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  createExercise: Exercise
  createRoutine: Routine
  deleteExercise: Exercise
  deleteRoutine: Routine
  editExercise: Exercise
  editRoutine: Routine
}

export type MutationCreateExerciseArgs = {
  exerciseInput: ExerciseInput
}

export type MutationCreateRoutineArgs = {
  routineInput: RoutineInput
}

export type MutationDeleteExerciseArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteRoutineArgs = {
  id: Scalars['String']['input']
}

export type MutationEditExerciseArgs = {
  exerciseInput: ExerciseInput
  id: Scalars['String']['input']
}

export type MutationEditRoutineArgs = {
  id: Scalars['String']['input']
  routineInput: RoutineInput
}

export type Query = {
  __typename?: 'Query'
  _entities: Array<Maybe<_Entity>>
  _service: _Service
  exercise: Exercise
  exercises: Array<Exercise>
  routine: Routine
  routines: Array<Routine>
}

export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']['input']>
}

export type QueryExerciseArgs = {
  id: Scalars['String']['input']
}

export type QueryRoutineArgs = {
  id: Scalars['String']['input']
}

export type Routine = {
  __typename?: 'Routine'
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  workouts: Array<RoutineWorkout>
}

export type RoutineInput = {
  description: Scalars['String']['input']
  name: Scalars['String']['input']
  workouts: Array<RoutineWorkoutInput>
}

export type RoutineWorkout = {
  __typename?: 'RoutineWorkout'
  exerciseDescription: Scalars['String']['output']
  exerciseId: Scalars['String']['output']
  exerciseName: Scalars['String']['output']
  reps: Scalars['Float']['output']
  sets: Scalars['Float']['output']
}

export type RoutineWorkoutInput = {
  exerciseDescription: Scalars['String']['input']
  exerciseId: Scalars['String']['input']
  exerciseName: Scalars['String']['input']
  reps: Scalars['Float']['input']
  sets: Scalars['Float']['input']
}

export type _Entity = Exercise | Routine

export type _Service = {
  __typename?: '_Service'
  sdl?: Maybe<Scalars['String']['output']>
}

export type Link__Purpose =
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  | 'EXECUTION'
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  | 'SECURITY'

export type ExerciseFragment = {
  __typename?: 'Exercise'
  description: string
  id: string
  name: string
}

export type RoutineFragment = {
  __typename?: 'Routine'
  description: string
  id: string
  name: string
}

export type RoutineDetailsFragment = {
  __typename?: 'Routine'
  description: string
  id: string
  name: string
  workouts: Array<{
    __typename?: 'RoutineWorkout'
    exerciseDescription: string
    exerciseId: string
    exerciseName: string
    reps: number
    sets: number
  }>
}

export type CreateExerciseMutationVariables = Exact<{
  exerciseInput: ExerciseInput
}>

export type CreateExerciseMutation = {
  __typename?: 'Mutation'
  createExercise: {
    __typename?: 'Exercise'
    description: string
    id: string
    name: string
  }
}

export type DeleteExerciseMutationVariables = Exact<{
  deleteExerciseId: Scalars['String']['input']
}>

export type DeleteExerciseMutation = {
  __typename?: 'Mutation'
  deleteExercise: {
    __typename?: 'Exercise'
    description: string
    id: string
    name: string
  }
}

export type EditExerciseMutationVariables = Exact<{
  editExerciseId: Scalars['String']['input']
  exerciseInput: ExerciseInput
}>

export type EditExerciseMutation = {
  __typename?: 'Mutation'
  editExercise: {
    __typename?: 'Exercise'
    description: string
    id: string
    name: string
  }
}

export type ExercisesQueryVariables = Exact<{ [key: string]: never }>

export type ExercisesQuery = {
  __typename?: 'Query'
  exercises: Array<{
    __typename?: 'Exercise'
    description: string
    id: string
    name: string
  }>
}

export type RoutineQueryVariables = Exact<{
  routineId: Scalars['String']['input']
}>

export type RoutineQuery = {
  __typename?: 'Query'
  routine: {
    __typename?: 'Routine'
    description: string
    id: string
    name: string
    workouts: Array<{
      __typename?: 'RoutineWorkout'
      exerciseDescription: string
      exerciseId: string
      exerciseName: string
      reps: number
      sets: number
    }>
  }
}

export type RoutinesQueryVariables = Exact<{ [key: string]: never }>

export type RoutinesQuery = {
  __typename?: 'Query'
  routines: Array<{
    __typename?: 'Routine'
    description: string
    id: string
    name: string
  }>
}
