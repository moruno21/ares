import { Directive, Field, ID, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Directive('@key(fields: "id")')
export class Workout {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  exerciseId!: string

  @Field(() => Number)
  reps!: number

  @Field(() => Number)
  sets!: number
}

@InputType()
export class WorkoutInput {
  @Field(() => String)
  exerciseId!: string

  @Field(() => Number)
  reps!: number

  @Field(() => Number)
  sets!: number
}
