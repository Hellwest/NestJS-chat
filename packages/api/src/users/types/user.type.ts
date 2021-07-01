import { Field, ID, ObjectType } from "@nestjs/graphql"
import { GraphQLScalarType } from "graphql"
import { User } from "../user.schema"

@ObjectType({ description: "Chat user" })
export class UserType {
  constructor(user?: User) {
    this.id = user.id
    this.login = user.login
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }

  @Field((): GraphQLScalarType => ID, { description: "User ID" })
  id: string

  @Field({ description: "User login" })
  login: string

  @Field({ description: "User creation date" })
  createdAt: Date

  @Field({ description: "User update date" })
  updatedAt: Date
}
