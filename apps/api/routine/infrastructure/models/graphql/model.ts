import { Directive, Field, ID, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
class RoutineWorkout {
  @Field(() => String)
  exerciseId: string

  @Field(() => String, { nullable: true })
  exerciseName: string

  @Field(() => Number)
  reps: number

  @Field(() => Number)
  sets: number
}

@ObjectType()
@Directive('@key(fields: "id")')
export class Routine {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  description?: string

  @Field(() => [RoutineWorkout])
  workouts?: RoutineWorkout[]
}

@InputType()
class RoutineWorkoutInput {
  @Field(() => String)
  exerciseId: string

  @Field(() => Number)
  reps: number

  @Field(() => Number)
  sets: number
}

@InputType()
export class RoutineInput {
  @Field(() => String)
  name!: string

  @Field(() => String)
  description?: string

  @Field(() => [RoutineWorkoutInput])
  workouts?: RoutineWorkoutInput[]
}
