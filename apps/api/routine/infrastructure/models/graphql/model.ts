import { Directive, Field, ID, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Directive('@key(fields: "id")')
export class Routine {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  description?: string
}

@InputType()
export class RoutineInput {
  @Field(() => String)
  name!: string

  @Field(() => String)
  description?: string
}
