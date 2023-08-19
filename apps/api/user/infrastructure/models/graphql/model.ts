import { Directive, Field, ID, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  email!: string

  @Field(() => String)
  name!: string
}

@InputType()
export class UserInput {
  @Field(() => String)
  email: string
}
