import { Field, InputType } from "@nestjs/graphql"

@InputType({ description: "Input to sign in" })
export class SignInInput {
  @Field({ description: "User's login" })
  login: string

  @Field({ description: "User's password" })
  password: string
}
