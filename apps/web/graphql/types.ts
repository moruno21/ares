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
  createUser: User
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

export type MutationCreateUserArgs = {
  userInput: UserInput
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
  routinesByOwnerId: Array<Routine>
  userByEmail: User
  userById: User
  users: Array<User>
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

export type QueryRoutinesByOwnerIdArgs = {
  ownerId: Scalars['String']['input']
}

export type QueryUserByEmailArgs = {
  email: Scalars['String']['input']
}

export type QueryUserByIdArgs = {
  id: Scalars['String']['input']
}

export type Routine = {
  __typename?: 'Routine'
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  ownerId: Scalars['String']['output']
  workouts: Array<RoutineWorkout>
}

export type RoutineInput = {
  description: Scalars['String']['input']
  name: Scalars['String']['input']
  ownerId: Scalars['String']['input']
  workouts: Array<RoutineWorkoutInput>
}

export type RoutineWorkout = {
  __typename?: 'RoutineWorkout'
  exerciseId: Scalars['String']['output']
  exerciseName?: Maybe<Scalars['String']['output']>
  reps: Scalars['Float']['output']
  sets: Scalars['Float']['output']
}

export type RoutineWorkoutInput = {
  exerciseId: Scalars['String']['input']
  reps: Scalars['Float']['input']
  sets: Scalars['Float']['input']
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type UserInput = {
  email: Scalars['String']['input']
}

export type _Entity = Exercise | Routine | User

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
  ownerId: string
}

export type RoutineDetailsFragment = {
  __typename?: 'Routine'
  description: string
  id: string
  name: string
  ownerId: string
  workouts: Array<{
    __typename?: 'RoutineWorkout'
    exerciseId: string
    exerciseName?: string
    reps: number
    sets: number
  }>
}

export type UserFragment = {
  __typename?: 'User'
  email: string
  id: string
  name: string
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

export type CreateRoutineMutationVariables = Exact<{
  routineInput: RoutineInput
}>

export type CreateRoutineMutation = {
  __typename?: 'Mutation'
  createRoutine: {
    __typename?: 'Routine'
    description: string
    id: string
    name: string
    ownerId: string
  }
}

export type CreateUserMutationVariables = Exact<{
  userInput: UserInput
}>

export type CreateUserMutation = {
  __typename?: 'Mutation'
  createUser: { __typename?: 'User'; email: string; id: string; name: string }
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

export type DeleteRoutineMutationVariables = Exact<{
  deleteRoutineId: Scalars['String']['input']
}>

export type DeleteRoutineMutation = {
  __typename?: 'Mutation'
  deleteRoutine: {
    __typename?: 'Routine'
    description: string
    id: string
    name: string
    ownerId: string
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

export type EditRoutineMutationVariables = Exact<{
  editRoutineId: Scalars['String']['input']
  routineInput: RoutineInput
}>

export type EditRoutineMutation = {
  __typename?: 'Mutation'
  editRoutine: {
    __typename?: 'Routine'
    description: string
    id: string
    name: string
    ownerId: string
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
    ownerId: string
    workouts: Array<{
      __typename?: 'RoutineWorkout'
      exerciseId: string
      exerciseName?: string
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
    ownerId: string
  }>
}

export type RoutinesByOwnerIdQueryVariables = Exact<{
  ownerId: Scalars['String']['input']
}>

export type RoutinesByOwnerIdQuery = {
  __typename?: 'Query'
  routinesByOwnerId: Array<{
    __typename?: 'Routine'
    description: string
    id: string
    name: string
    ownerId: string
    workouts: Array<{
      __typename?: 'RoutineWorkout'
      exerciseId: string
      exerciseName?: string
      reps: number
      sets: number
    }>
  }>
}

export type UserByEmailQueryVariables = Exact<{
  userEmail: Scalars['String']['input']
}>

export type UserByEmailQuery = {
  __typename?: 'Query'
  userByEmail: { __typename?: 'User'; email: string; id: string; name: string }
}

export type UserByIdQueryVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type UserByIdQuery = {
  __typename?: 'Query'
  userById: { __typename?: 'User'; email: string; id: string; name: string }
}

export type UsersQueryVariables = Exact<{ [key: string]: never }>

export type UsersQuery = {
  __typename?: 'Query'
  users: Array<{ __typename?: 'User'; email: string; id: string; name: string }>
}
