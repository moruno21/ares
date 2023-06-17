import { Directive, Field, ID, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Directive('@key(fields: "id")')
export class Exercise {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  description?: string
}

@InputType()
export class ExerciseInput {
  @Field(() => String)
  name!: string

  @Field(() => String)
  description?: string
}
