import { Field, ID, ObjectType } from "@nestjs/graphql"
import { GraphQLScalarType } from "graphql"
import { User } from "src/users/users.service"

@ObjectType({ description: "User's general information object" })
export class AuthType {
  constructor(user: User) {
    Object.assign(this, { id: user.id, login: user.login })
  }

  @Field((): GraphQLScalarType => ID, { description: "User ID" })
  id: string

  @Field({ description: "User login" })
  login: string
}
