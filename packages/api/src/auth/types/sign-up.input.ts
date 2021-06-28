import { Field, InputType } from "@nestjs/graphql"

@InputType({ description: "Input for signing up" })
export class SignUpInput {
  @Field({ description: "User name" })
  login: string

  @Field({ description: "User password" })
  password: string
}
